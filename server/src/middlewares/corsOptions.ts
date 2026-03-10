// Allowed client side URLs
const LOCAL_URL = 'http://localhost:3000';

export const corsOptions = {
  origin: [LOCAL_URL],
  credentials: true,
};
