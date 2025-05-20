import { PrismaClient } from '@prisma/client';
import { RequestHandler } from 'express';
import dotenv from 'dotenv';

const prisma = new PrismaClient();
dotenv.config();

export const getPaginateUsers: RequestHandler = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, search } = req.body;

        const pageNumber = parseInt(page as string, 10);
        const pageSize = parseInt(limit as string, 10);

        if (isNaN(pageNumber) || isNaN(pageSize) || pageNumber <= 0 || pageSize <= 0) {
            res.status(400).json({ message: 'Invalid pagination parameters' });
            return;
        }

        const skip = (pageNumber - 1) * pageSize;
        let users;

        if (search) {
            console.log(`search: ${search}`);
            users = await prisma.user.findMany({
                skip,
                take: pageSize,
                where: {
                    OR: [
                        { firstName: { contains: search, mode: 'insensitive' } },
                        { lastName: { contains: search, mode: 'insensitive' } },
                        { email: { contains: search, mode: 'insensitive' } },
                        { userName: { contains: search, mode: 'insensitive' } },
                    ],
                },
            });
        } else {
            users = await prisma.user.findMany({
                skip,
                take: pageSize,
            });
        }

        res.status(200).json({
            currentPage: pageNumber,
            pageSize,
            users,
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error fetching data' });
        next(e);
    }
};

export const addUser: RequestHandler = async (req, res, next) => {
    try {
        const { firstName, lastName, email, userName, password , telepon } = req.body;
        if (!firstName || !lastName || !email || !userName || !password || !telepon) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            res.status(400).json({ message: 'User with this email already exists' });
            return;
        }

        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                userName,
                password,
                telepon,
            },
        });
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error creating user' });
        next(e);
    }
};


export const countUsers: RequestHandler = async (req, res, next) => {
    try {
        const search = req.query.search;
        let count;
        if (search) {
            count = await prisma.user.count({
                where: {
                    OR: [
                        { firstName: { contains: search as string, mode: 'insensitive' } },
                        { lastName: { contains: search as string, mode: 'insensitive' } },
                        { email: { contains: search as string, mode: 'insensitive' } },
                        { userName: { contains: search as string, mode: 'insensitive' } },
                    ],
                },
            });
        } else {
            count = await prisma.user.count();
        }

        res.status(200).json({ totalUsers: count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error counting users' });
        next(error);
    }
};

export const getVideoById: RequestHandler = async (req, res, next) => {
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching video' });
        next(error);
    }
};


export const deleteUser: RequestHandler = async (req, res, next) => {
    const { id } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id, 10) },
        });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        await prisma.user.delete({
            where: { id: parseInt(id, 10) },
        });

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting user' });
        next(error);
    }
};

export const updateUser: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    const { firstName, lastName, email, userName, password } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({
            where: { id: parseInt(id, 10) },
        });

        if (!existingUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id, 10) },
            data: {
                firstName: firstName || existingUser.firstName,
                lastName: lastName || existingUser.lastName,
                email: email || existingUser.email,
                userName: userName || existingUser.userName,
                password: password || existingUser.password, // Note: Ensure password is hashed before saving in production
            },
        });

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating user' });
        next(error);
    }
};