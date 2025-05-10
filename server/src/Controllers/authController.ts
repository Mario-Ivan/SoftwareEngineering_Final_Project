import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword } from '../utils/hashPassword';
import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';

const prisma = new PrismaClient();


export const register:RequestHandler = async (req, res, next) => {
    try{
        const { firstName, lastName, userName , password, email } = req.body;
        if (!firstName || !lastName || !email || !userName || !password) {
            res.status(400).json({ message: 'Mohon Isi semua bagian dengan lengkap!'});
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(400).json({ message: 'Mohon isi email yang valid!' });
            return;
        }

        if (password.length < 6) {
            res.status(400).json({ message: 'Password harus minimal 6 kata!' });
            return;
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: 'Sudah ada akun teradaftar menggunakan email tersebut!' });
            return;
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                userName,
                email,
                password: hashedPassword,
            },
        });
        res.status(201).json({
            message: 'User registered successfully',
            newUser,
        });
    }catch(error){
        next(error);
    }
};

export const login:RequestHandler = async (req, res, next) => {
    try{
        const { email, password } = req.body;
        if (email === 'admin@gmail.com') {
            const adminPassword = process.env.ADMIN_PASSWORD;
            console.log(adminPassword);
            if (!adminPassword || password !== adminPassword) {
                res.status(400).json({ message: 'Invalid admin credentials' });
                return;
            }

            const token = jwt.sign({ userId: 'admin', email , role: 'admin'}, process.env.JWT_SECRET!, { expiresIn: '1h' });

            res.status(200).json({
                message: 'Admin login successful',
                token,
            });
            return;
        }
        if (!email || !password) {
            res.status(400).json({ message: 'Email and password are required' });
            return;
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(400).json({ message: 'Incorrect Email or Password' });
            return;
        }

        const validPassword = await comparePassword(password, user.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect Email or Password' });
            return;
        }

        const token = jwt.sign({ userId: user.id, email: user.email, role: 'user' }, process.env.JWT_SECRET!, { expiresIn: '6h' });

        res.status(200).json({
            message: 'Login successful',
            token,
        });
        return;
    }catch(error){
        next(error);
    }
};


export const logout: RequestHandler = (req, res) => {
    res.status(200).json({
        message: 'Logout successful',
        token: null,
    });
};

export const validateToken: RequestHandler = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Token is required' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        res.status(200).json({
            message: 'Token is valid',
            decoded,
        });
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
        console.log(error);
    }
};