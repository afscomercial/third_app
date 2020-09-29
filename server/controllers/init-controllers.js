import { logger } from '../handlers/index';
const dev = process.env.NODE_ENV !== 'production';

var countMap = new Map();
function countLog(name) {
  if (countMap.has(name)) {
    let count = countMap.get(name);
    countMap.set(name, { value: ++count.value });
  } else {
    countMap.set(countMap.set(name, { value: 1 }));
  }
  logger.info(`> ${name} event # : ${countMap.get(name).value}`);
}

export const status = (ctx) => {
  logger.info(`> Status ALIVE`);
  return (ctx.body = {
    status: 'success',
    data: 'data',
  });
};

export const webhook = (ctx) => {
  console.log('received webhook: ', ctx.state.webhook);
  if (dev) {
    countLog('PRODUCTS_CREATE');
  }
};
