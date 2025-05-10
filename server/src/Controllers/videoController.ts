import { RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';
import { DeleteObjectCommand, GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const prisma = new PrismaClient();

dotenv.config();




const s3Client = new S3Client({
    endpoint: process.env.WASABI_ENDPOINT,
    region: process.env.WASABI_REGION,
    credentials: {
        accessKeyId: process.env.WASABI_KEY!,
        secretAccessKey: process.env.WASABI_SECRET!
    }
});

const upload = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: process.env.WASABI_BUCKET!,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, cb) => cb(null, `videos/${Date.now()}-${file.originalname}`)
    })
  });

export const uploadVideo: RequestHandler[] = [
        upload.single('file'),
        async (req, res, next) => {
        const { title, category, description } = req.body;

        if (!title || !category || !description) {
            res.status(400).json({ message: 'Title, category, and description are required' });
            return;
        }

        const file = req.file as Express.MulterS3.File;
        if (!file) {
            res.status(400).json({ message: 'No video file uploaded' });
            return;
        }

        try {
            const video = await prisma.vids.create({
            data: {
                name: file.originalname,
                title,
                category,
                description,
                filePath: file.location,
                fileKey: file.key,
                uploadTime: new Date(),
            },
            });
            res.status(201).json({ message: 'Video uploaded successfully', video });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error uploading video' });
        }
        next();
    },
];

export const getVideoUrl: RequestHandler = async (req, res) => {
    const id = Number(req.params.id);                                    
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid video id" });
        return;
    }

    const record = await prisma.vids.findUnique({
        where: { id },
        select: { fileKey: true }
    });

    if (!record) {
        res.status(404).json({ message: "Video not found" });
        return;
    }

    const command = new GetObjectCommand({
        Bucket: process.env.WASABI_BUCKET!,
        Key: record.fileKey
    });
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    res.json({ url });
};

// Get all videos
export const getAllVideos:RequestHandler = async (req, res, next) => {
    try {
        const videos = await prisma.vids.findMany();
        res.status(200).json(videos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching videos' });
        next(error);
    }
};

export const getPaginate: RequestHandler = async (req, res, next) => {
    try{
        const { page = 1, limit = 10 } = req.body;

        const pageNumber = parseInt(page as string, 10);
        const pageSize = parseInt(limit as string, 10);

        if (isNaN(pageNumber) || isNaN(pageSize) || pageNumber <= 0 || pageSize <= 0) {
            res.status(400).json({ message: 'Invalid pagination parameters' });
            return;
        }

        const skip = (pageNumber - 1) * pageSize;

        const videos = await prisma.vids.findMany({
            skip,
            take: pageSize,
        });

        const totalVideos = await prisma.vids.count();
        const totalPages = Math.ceil(totalVideos / pageSize);

        res.status(200).json({
            currentPage: pageNumber,
            totalPages,
            pageSize,
            totalVideos,
            videos,
        });
    }catch(e){
        console.log(e);
        res.status(500).json({message: 'Error fetching data'});
        next(e);
    }
}

// Get a single video by ID
export const getVideoById:RequestHandler = async (req, res, next) => {
    const { id } = req.params;

    try {
        const video = await prisma.vids.findUnique({
            where: { id: parseInt(id, 10) },
        });

        if (!video) {
            res.status(404).json({ message: 'Video not found' });
            return;
        }

        res.status(200).json(video);
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching video' });
        next(error);
    }
};

// Update a video
export const updateVideo:RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    const { title, category, description } = req.body;

    try {
        const video = await prisma.vids.update({
            where: { id: parseInt(id, 10) },
            data: { title, category, description },
        });

        res.status(200).json({ message: 'Video updated successfully', video });
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating video' });
        next(error);
    }
};

// Delete a video
export const deleteVideo:RequestHandler = async (req, res, next) => {
    const { id } = req.params;

    try {
        const video = await prisma.vids.findUnique({
            where: { id: parseInt(id, 10) },
        });

        if (!video) {
            res.status(404).json({ message: 'Video not found' });
            return;
        }

        const command = new GetObjectCommand({
            Bucket: process.env.WASABI_BUCKET!,
            Key: video.fileKey,
        });

        try {
            await s3Client.send(command);
            await s3Client.send(new DeleteObjectCommand({
                Bucket: process.env.WASABI_BUCKET!,
                Key: video.fileKey,
            }));
        } catch (error) {
            console.error('Error deleting video from S3:', error);
            res.status(500).json({ message: 'Error deleting video from storage' });
            return;
        }

        await prisma.vids.delete({
            where: { id: parseInt(id, 10) },
        });

        res.status(200).json({ message: 'Video deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting video' });
        next(error);
    }
};

export const countVideos: RequestHandler = async (req, res, next) => {
    try {
        const count = await prisma.vids.count();
        res.status(200).json({ totalVideos: count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error counting videos' });
        next(error);
    }
};