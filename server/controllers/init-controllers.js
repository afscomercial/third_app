import { logsEnum, writeLog } from '../handlers';
import { post } from '../services';
import dotenv from 'dotenv';
dotenv.config();

const dev = process.env.NODE_ENV !== 'production';

var countMap = new Map();
function countLog(name) {
  if (countMap.has(name)) {
    let count = countMap.get(name);
    countMap.set(name, { value: ++count.value });
  } else {
    countMap.set(countMap.set(name, { value: 1 }));
  }
  writeLog(logsEnum.info, `> ${name} event # : ${countMap.get(name).value}`);
}

export const status = async (ctx) => {
  writeLog(logsEnum.info, `> STATUS Alive`);
  const data = await post('/my/api/path', { data: 'satus' });
  const response = ctx;
  ctx.status = 200;
  ctx.body = {
    status: 'success',
    data: data,
  };
  return response;
};

export const webhook = (ctx) => {
  console.log('received webhook: ', ctx.state.webhook);
  if (dev) {
    countLog('PRODUCTS_CREATE');
  }
};
