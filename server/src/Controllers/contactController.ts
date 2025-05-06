import {RequestHandler } from 'express';
import nodemailer from 'nodemailer';

export const submitContact:RequestHandler = async (req,res, next) => {
    const { name, phone, email, message } = req.body;

    if (!name || !phone || !email || !message) {
        res.status(400).json({ error: 'All fields are required.' });
        return;
    }

    try {
        // Configure the email transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Use your email provider
            auth: {
                user: 'Evision@gmail.com', // Replace with your email
                pass: 'your-email-password', // Replace with your email password or app password
            },
        });

        // Email content
        const mailOptions = {
            from: email,
            to: 'Evision@gmail.com', // Replace with your personal email
            subject: 'New Contact Submission',
            text: `You have a new contact submission:
            Name: ${name}
            Phone: ${phone}
            Email: ${email}
            Message: ${message}`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Contact submission sent successfully.' });
        return;
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send contact submission.' });
        next(error);
    }
};