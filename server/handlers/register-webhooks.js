import { logger } from './logger';
import { registerWebhook } from "@shopify/koa-shopify-webhooks";


export const registerWebhooks = async (
  shop,
  accessToken,
  type,
  url,
  apiVersion
) => {
  const registration = await registerWebhook({
    address: `${process.env.HOST}${url}`,
    topic: type,
    accessToken,
    shop,
    apiVersion
  });

  if (registration.success) {
    logger.info("> Successfully registered webhook!");
  } else {
    logger.info(
      "> Failed to register webhook",
      registration.result.data.webhookSubscriptionCreate
    );
  }
};
