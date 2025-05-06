import { RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import multer from 'multer';

const prisma = new PrismaClient();

// Upload a video
// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

export const uploadVideo:RequestHandler[] = [upload.single('video'), async (req, res, next) => {
        const { title, category, description } = req.body;
        const file = req.file;

        if (!file) {
            res.status(400).json({ message: 'No video file uploaded' });
            return;
        }

        const filePath = path.join(__dirname, '../../uploads', file.filename);

        try {
            const video = await prisma.vids.create({
                data: {
                    name: file.filename,
                    title,
                    category,
                    description,
                    filePath,
                    uploadTime: new Date(),
                },
            });

            res.status(201).json({ message: 'Video uploaded successfully', video });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error uploading video' });
            next(error);
        }
    },
];

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

        fs.unlink(path.join(__dirname, '../../uploads', video.name), (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            }
        });

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