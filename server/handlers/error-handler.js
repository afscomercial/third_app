import { logsEnum, writeLog } from './logger';

export const errorHandler = () => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      const satus = err.status || 500;
      const body = err.expose ? err.message : 'An error occurred!';
      writeLog(logsEnum.error, `> ERROR - Status: ${satus} - Body: ${body} `);
      ctx.status = satus;
      ctx.body = body;
    }
  };
};
