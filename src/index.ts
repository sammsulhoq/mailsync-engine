import express from 'express';
import connectDB from './utils/db';
import authRoutes from './routes/authRoutes';
import syncRoutes from './routes/syncRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/sync', syncRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
