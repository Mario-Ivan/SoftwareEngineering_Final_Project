import { PrismaClient } from '@prisma/client';
import { RequestHandler } from 'express';

const prisma = new PrismaClient();
    
export const submitUserPayment: RequestHandler = async (req, res, next) => {
    try{
        const { userId, firstName, lastName, email, phoneNumber, paymentMethod } = req.body;
        if (!userId) {
            res.status(400).json({ error: 'User ID is required' });
            return;
        }
        if (!firstName) {
            res.status(400).json({ error: 'First name is required' });
            return;
        }
        if (!lastName) {
            res.status(400).json({ error: 'Last name is required' });
            return;
        }
        if (!email) {
            res.status(400).json({ error: 'Email is required' });
            return;
        }
        if (!phoneNumber) {
            res.status(400).json({ error: 'Phone number is required' });
            return;
        }
        if (!paymentMethod) {
            res.status(400).json({ error: 'Payment method is required' });
            return;
        }

        const payment = await prisma.payment.create({
            data: {
            userId,
            amount: req.body.amount,
            paymentMethod,
            paymentDate: new Date(),
            paymentStatus: false,
            },
        });

        res.status(201).json({ message: 'Payment submitted successfully. Wait for it to be verified!', payment });
        return;
    }catch(error){
        next(error);
    }
}

export const getAllPending: RequestHandler = async(req, res, next) => {
    try {
        const pendingPayments = await prisma.payment.findMany({
            where: {
                paymentStatus: false,
            },
        });

        res.status(200).json({ message: 'Pending payments retrieved successfully', pendingPayments });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving pending payments' });
        next(error);
    }
}

export const verifyPaymentById: RequestHandler = async(req, res, next) => {
    try{
        const { paymentId } = req.body;

        if (!paymentId) {
            res.status(400).json({ error: 'Payment ID is required' });
            return;
        }

        const payment = await prisma.payment.findUnique({
            where: { id: parseInt(paymentId) },
        });

        if (!payment) {
            res.status(404).json({ error: 'Payment not found' });
            return;
        }

        if (payment.paymentStatus) {
            res.status(400).json({ error: 'Payment is already verified' });
            return;
        }

        const updatedPayment = await prisma.payment.update({
            where: { id: parseInt(paymentId) },
            data: { paymentStatus: true },
        });

        res.status(200).json({ message: 'Payment verified successfully', updatedPayment });
    }catch(error){
        res.status(500).json({ error: 'An error occurred while retrieving pending payments' });
        next(error);
    }
}

export const getUserPaymentHistory: RequestHandler = async(req,res,next) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            res.status(400).json({ error: 'User ID is required' });
            return;
        }

        const paymentHistory = await prisma.payment.findMany({
            where: {
                userId: parseInt(userId),
            },
        });

        res.status(200).json({ message: 'Payment history retrieved successfully', paymentHistory });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving payment history' });
        next(error);
    }
}