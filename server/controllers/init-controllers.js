import { logsEnum, writeLog } from '../handlers';
import { postRequest } from '../services';
import { environment } from '../config';

const dev = environment.env !== 'production';

var countMap = new Map();
function countLog(name, domain) {
  if (countMap.has(name)) {
    let count = countMap.get(name);
    countMap.set(name, { value: ++count.value });
  } else {
    countMap.set(countMap.set(name, { value: 1, domain: domain }));
  }
  writeLog(logsEnum.info, `> ${name} event # : ${countMap.get(name).value} from ${domain}`);
}

export const status = async (ctx) => {
  writeLog(logsEnum.info, `> STATUS Alive`);
  const data = await postRequest('/my/api/path', { data: 'status' });
  const response = ctx;
  ctx.status = 200;
  ctx.body = {
    status: 'success',
    data: data,
  };
  return response;
};

export const webhook = (ctx) => {
  let webhook = ctx.state.webhook;
  if (dev) {
    countLog(webhook.topic, webhook.domain);
    console.log(JSON.stringify(webhook));
  }
};
