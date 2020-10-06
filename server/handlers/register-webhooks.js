import { logsEnum, writeLog } from './logger';
import { registerWebhook } from '@shopify/koa-shopify-webhooks';
import { uninstallApp } from '../services';

var countMap = new Map();
function countLog(shop, type, webhooksLength) {
  if (countMap.has(shop)) {
    let count = countMap.get(shop);
    countMap.set(shop, { value: ++count.value });
  } else {
    countMap.set(countMap.set(shop, { value: 1 }));
  }
  let count = countMap.get(shop).value;
  if (count < webhooksLength) {
    writeLog(
      logsEnum.warn,
      `> SUCCESSFULLY registered webhook ${type} from ${shop} ${count}/${webhooksLength}`,
    );
  } else if ((count = webhooksLength)) {
    writeLog(
      logsEnum.warn,
      `> SUCCESSFULLY registered webhook ${type} from ${shop} ${count}/${webhooksLength}`,
    );
    countMap.set(countMap.set(shop, { value: 0 }));
  }
}

export const registerWebhooks = async (shop, accessToken, type, url, apiVersion, webhooksLength) => {
  const registration = await registerWebhook({
    address: `${process.env.HOST}${url}`,
    topic: type,
    accessToken,
    shop,
    apiVersion,
  });

  if (registration.success) {
    countLog(shop, type, webhooksLength);
  } else {
    writeLog(logsEnum.error, `> FAILED to register webhook ${type} from ${shop}`);
    countMap.set(countMap.set(shop, { value: 0 }));
    await uninstallApp(shop, accessToken);
    writeLog(logsEnum.info, `> UNINSTALLED app from ${shop}`);
    return 'error';
  }
};
