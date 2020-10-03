import { logsEnum, writeLog } from './logger';
import { registerWebhook } from '@shopify/koa-shopify-webhooks';

var retries = 0;

export const registerWebhooks = async (shop, accessToken, type, url, apiVersion) => {
  const registration = await registerWebhook({
    address: `${process.env.HOST}${url}`,
    topic: type,
    accessToken,
    shop,
    apiVersion,
  });

  if (registration.success) {
    writeLog(logsEnum.warn, `> SUCCESSFULLY registered webhook ${type} from ${shop}`);
  } else {
    if (retries < 1) {
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
