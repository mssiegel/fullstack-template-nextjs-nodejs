import express from 'express';
import cors from 'cors';

import itemRoutes from './routes/itemRoutes';
import { corsOptions } from './middlewares/corsOptions';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(cors(corsOptions));

app.use(express.json());

// Routes
app.use('/healthcheck', (req, res) => {
  res.status(200).json({ status: 'ok' });
});
app.use('/api/items', itemRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
