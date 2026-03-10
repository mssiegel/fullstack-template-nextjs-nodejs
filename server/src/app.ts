import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { corsOptions } from './middlewares/corsOptions';
import { errorHandler } from './utils/errorHandler';
import authRoutes from './routes/authRoutes';
import itemRoutes from './routes/itemRoutes';
import userRoutes from './routes/userRoutes';

const app = express();

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/healthcheck', (req, res) => {
  res.status(200).json({ status: 'ok' });
});
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
