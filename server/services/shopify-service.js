import { request } from './axios-service';

export const uninstallApp = (shop, accessToken) => {
  const headers = {
    'X-Shopify-Access-Token': accessToken,
    'content_type': 'application/json',
    'accept': 'application/json',
  };

  const url = `https://${shop}/admin/api_permissions/current.json`;

  return request(url, { method: 'delete', headers: headers });
};
