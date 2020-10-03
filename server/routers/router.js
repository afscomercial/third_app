import Router from 'koa-router';
import { verifyRequest } from '@shopify/koa-shopify-auth';
import * as initControllers from '../controllers/index';

export const routers = (handle, webhook) => {
  return new Router()
    .post('/webhooks/(.*)', webhook, initControllers.webhook)
    .get('/status', initControllers.status)
    .get('*', verifyRequest(), async (ctx) => {
      await handle(ctx.req, ctx.res);
      ctx.respond = false;
      ctx.res.statusCode = 200;
    });
};
