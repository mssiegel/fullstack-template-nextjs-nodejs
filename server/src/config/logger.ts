import pino from 'pino';

const logger = pino({
  level: 'info', // Default log level
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});

export default logger;
