import pino from 'pino';
import { environment } from '../config';

const writeLogs = environment.writeLogs;

const dest = pino.destination({
  dest: './logs/info.log',
  minLength: 4096,
  sync: false,
});
dest[Symbol.for('pino.metadata')] = true;
export const logsEnum = Object.freeze({ info: 'info', error: 'error', warn: 'warn' });

const logger = pino(
  {
    timestamp: () => {
      return pino.stdTimeFunctions.isoTime();
    },
    prettyPrint: writeLogs !== true,
  },
  writeLogs ? dest : null,
);

function writtenLog() {
  if (writeLogs) {
    const { lastMsg, lastLevel, lastTime } = dest;
    console.log('Logged message "%s" at level %d at time %s', lastMsg, lastLevel, lastTime);
  }
}

const handler = pino.final(logger, (err, finalLogger, evt) => {
  finalLogger.info(`${evt} caught`);
  if (err) finalLogger.error(err, 'error caused exit');
  process.exit(err ? 1 : 0);
});

if (writeLogs) {
  setInterval(function () {
    logger.flush();
  }, 10000).unref();

  process.on('beforeExit', () => handler(null, 'beforeExit'));
  process.on('exit', () => handler(null, 'exit'));
  process.on('uncaughtException', (err) => handler(err, 'uncaughtException'));
  process.on('SIGINT', () => handler(null, 'SIGINT'));
  process.on('SIGQUIT', () => handler(null, 'SIGQUIT'));
  process.on('SIGTERM', () => handler(null, 'SIGTERM'));
}

export const writeLog = (type, message) => {
  switch (type) {
    case logsEnum.info:
      logger.info(message);
      writtenLog();
      break;
    case logsEnum.error:
      logger.error(message);
      writtenLog();
      break;
    case logsEnum.warn:
      logger.warn(message);
      writtenLog();
      break;
    default:
  }
};

export const httpLogger = () => {
  return async (ctx, next) => {
    const { method, path, origin } = ctx.request;
    logger.info(`> REQUEST url:${path} method:${method} origin:${origin}`);
    writtenLog();
    await next();
    // log Response
    // logger.info(`> RESPONSE status:${ctx.status} msg:${ctx.message}`);
    // writtenLog();
  };
};
