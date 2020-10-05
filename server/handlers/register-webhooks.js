import { logsEnum, writeLog } from './logger';
import { registerWebhook } from '@shopify/koa-shopify-webhooks';

var retries = 1;
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
    if (retries < 2) {
      retries++;
      registerWebhooks(shop, accessToken, type, url, apiVersion);
    } else {
      writeLog(
        logsEnum.error,
        `> FAILED to register webhook ${type} from ${shop} error ${registration.result.data.webhookSubscriptionCreate.userErrors.message} retry ${retries}`,
      );
      retries = 0;
    }
  }
};
