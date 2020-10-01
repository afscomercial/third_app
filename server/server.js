import '@babel/polyfill';
import dotenv from 'dotenv';
import 'isomorphic-fetch';
import createShopifyAuth from '@shopify/koa-shopify-auth';
import graphQLProxy, { ApiVersion } from '@shopify/koa-shopify-graphql-proxy';
import Koa from 'koa';
import next from 'next';
import session from 'koa-session';
import { errorHandler, logsEnum, httpLogger, registerWebhooks, writeLog } from './handlers';
import { routers } from './routers';
import { receiveWebhook } from '@shopify/koa-shopify-webhooks';

dotenv.config();
const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT, 10) || 8081;
const app = next({
  dev,
});
const handle = app.getRequestHandler();
const { SHOPIFY_API_SECRET, SHOPIFY_API_KEY, SCOPES } = process.env;
app.prepare().then(() => {
  const server = new Koa();
  server.use(errorHandler());
  const webhook = receiveWebhook({
    secret: SHOPIFY_API_SECRET,
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
  server.keys = [SHOPIFY_API_SECRET];
  server.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET,
      scopes: [SCOPES],
      async afterAuth(ctx) {
        const { shop, accessToken } = ctx.session;
        await registerWebhooks(
          shop,
          accessToken,
          'PRODUCTS_CREATE',
          '/webhooks/products/create',
          ApiVersion.October19,
        );

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
