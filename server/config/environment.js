export const environment = {
  apiVersion: process.env.API_VERSION,
  baseURL: process.env.BASE_CALL_URL,
  env: process.env.NODE_ENV,
  host: process.env.HOST,
  port: parseInt(process.env.POST, 10) || 8081,
  shopifyApiSecret: process.env.SHOPIFY_API_SECRET,
  shopifyApiKey: process.env.SHOPIFY_API_KEY,
  scopes: process.env.SCOPES,
  writeLogs: 'WRITE_LOGS' in process.env ? true : false,
};
