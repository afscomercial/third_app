import pino from 'pino';
const dev = process.env.NODE_ENV !== 'production';
export const logger = pino({
  timestamp: () => {
    return pino.stdTimeFunctions.isoTime();
  },
  prettyPrint: dev,
});
