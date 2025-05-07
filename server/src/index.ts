import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import paymentRoutes from './routes/paymentRoutes';
import videoRoutes from './routes/videoRoutes';
import contactRoutes from './routes/contactRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/payment', paymentRoutes);
app.use('/vids',videoRoutes);
app.use('/contact',contactRoutes);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`access at http://localhost:${port}`)
});
