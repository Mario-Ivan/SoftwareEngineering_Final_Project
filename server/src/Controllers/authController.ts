import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword } from '../utils/hashPassword';
import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';

const prisma = new PrismaClient();

// id Int @id @default(autoincrement())
// firstName String 
// lastName String
// password String 
// email String @unique
// telepon String @unique
// profile String?

export const register:RequestHandler = async (req, res, next) => {
    try{
        const { firstName, lastName, password, email, telepon } = req.body;
        if (!firstName || !lastName || !email || !password || !telepon) {
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

        const teleponRegex = /^[0-9]+$/;
        if (!teleponRegex.test(telepon)) {
            res.status(400).json({ message: 'Nomor telepon hanya berisi angka!' });
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
                email,
                password: hashedPassword,
                firstName,
                lastName,
                telepon,
            },
        });
        const token = jwt.sign({ userId: newUser.id, email: newUser.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        res.status(201).json({
            message: 'User registered successfully',
            token,
        });
    }catch(error){
        next(error);
    }
};

export const login:RequestHandler = async (req, res,next) => {
    try{
        const { email, password } = req.body;
        if (email === 'admin@gmail.com') {
            const adminPassword = process.env.ADMIN_PASSWORD;
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
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        const validPassword = await comparePassword(password, user.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        const token = jwt.sign({ userId: user.id, email: user.email, role: 'user' }, process.env.JWT_SECRET!, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login successful',
            token,
        });
        return;
    }catch(error){
        next(error);
    }
};
