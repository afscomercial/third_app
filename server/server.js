import '@babel/polyfill';
import dotenv from 'dotenv/config';
import 'isomorphic-fetch';
import createShopifyAuth from '@shopify/koa-shopify-auth';
import graphQLProxy, { ApiVersion } from '@shopify/koa-shopify-graphql-proxy';
import Koa from 'koa';
import next from 'next';
import session from 'koa-session';
import { environment, webhooksOctober19, webhooksApril20 } from './config';
import { errorHandler, logsEnum, httpLogger, registerWebhooks, writeLog } from './handlers';
import { routers } from './routers';
import { receiveWebhook } from '@shopify/koa-shopify-webhooks';
const dev = environment.env !== 'production';
const app = next({
  dev,
});
const handle = app.getRequestHandler();
const { port, shopifyApiSecret, shopifyApiKey, scopes } = environment;
app.prepare().then(() => {
  const server = new Koa();
  server.use(errorHandler());
  const webhook = receiveWebhook({
    secret: shopifyApiSecret,
  });

  server.use(
    session(
      {
        sameSite: 'none',
        secure: true,
      },
      server,
    ),
  );
  server.keys = [shopifyApiSecret];
  server.use(
    createShopifyAuth({
      apiKey: shopifyApiKey,
      secret: shopifyApiSecret,
      scopes: [scopes],
      async afterAuth(ctx) {
        const { shop, accessToken } = ctx.session;
        let defaultWebhooks = [];
        switch (environment.apiVersion) {
          case ApiVersion.October19:
            defaultWebhooks = webhooksOctober19;
            break;

          case ApiVersion.April20:
            defaultWebhooks = webhooksApril20;
            break;
        }

        for (const webhook of defaultWebhooks) {
          await registerWebhooks(shop, accessToken, webhook.name, webhook.route, webhook.apiVersion);
        }
        ctx.cookies.set('shopOrigin', shop, {
          httpOnly: false,
          secure: true,
          sameSite: 'none',
        });
        ctx.redirect('/');
      },
    }),
  );
  server.use(
    graphQLProxy({
      version: ApiVersion.October19,
    }),
  );
  server.use(httpLogger());
  const router = routers(handle, webhook);
  server.use(router.routes());
  server.use(router.allowedMethods());
  server.listen(port, () => {
    writeLog(logsEnum.info, `> READY on http://localhost:${port}`);
  });
});
