import { ApiVersion } from '@shopify/koa-shopify-graphql-proxy';

const version = ApiVersion.July20;

export const webhooksJuly20 = [
  { name: 'APP_UNINSTALLED', route: '/webhooks/app/uninstalled', apiVersion: version },
  { name: 'CARTS_CREATE', route: '/webhooks/carts/create', apiVersion: version },
  { name: 'CARTS_UPDATE', route: '/webhooks/carts/update', apiVersion: version },
  { name: 'CHECKOUTS_CREATE', route: '/webhooks/checkouts/create', apiVersion: version },
  { name: 'CHECKOUTS_DELETE', route: '/webhooks/checkouts/delete', apiVersion: version },
  { name: 'CHECKOUTS_UPDATE', route: '/webhooks/checkouts/update', apiVersion: version },
  { name: 'COLLECTIONS_CREATE', route: '/webhooks/collections/create', apiVersion: version },
  { name: 'COLLECTIONS_DELETE', route: '/webhooks/collections/delete', apiVersion: version },
  { name: 'COLLECTIONS_UPDATE', route: '/webhooks/collections/update', apiVersion: version },
  {
    name: 'CUSTOMER_GROUPS_CREATE',
    route: '/webhooks/customers-groups/create',
    apiVersion: version,
  },
  {
    name: 'CUSTOMER_GROUPS_DELETE',
    route: '/webhooks/customers-groups/delete',
    apiVersion: version,
  },
  {
    name: 'CUSTOMER_GROUPS_UPDATE',
    route: '/webhooks/customers-groups/update',
    apiVersion: version,
  },
  { name: 'CUSTOMERS_CREATE', route: '/webhooks/customers/create', apiVersion: version },
  { name: 'CUSTOMERS_DELETE', route: '/webhooks/customers/delete', apiVersion: version },
  { name: 'CUSTOMERS_DISABLE', route: '/webhooks/customers/disable', apiVersion: version },
  { name: 'CUSTOMERS_ENABLE', route: '/webhooks/customers/enable', apiVersion: version },
  { name: 'CUSTOMERS_UPDATE', route: '/webhooks/customers/update', apiVersion: version },
  { name: 'DRAFT_ORDERS_CREATE', route: '/webhooks/draft/orders_create', apiVersion: version },
  { name: 'DRAFT_ORDERS_DELETE', route: '/webhooks/draft/orders_delete', apiVersion: version },
  { name: 'DRAFT_ORDERS_UPDATE', route: '/webhooks/draft/orders_update', apiVersion: version },
  { name: 'FULFILLMENTS_CREATE', route: '/webhooks/fulfillments/create', apiVersion: version },
  { name: 'FULFILLMENTS_UPDATE', route: '/webhooks/fulfillments/update', apiVersion: version },
  { name: 'FULFILLMENT_EVENTS_CREATE', route: '/webhooks/fulfillment/events_create', apiVersion: version },
  { name: 'FULFILLMENT_EVENTS_DELETE', route: '/webhooks/fulfillment/events_delete', apiVersion: version },
  {
    name: 'INVENTORY_LEVELS_CONNECT',
    route: '/webhooks/inventory-levels/connect',
    apiVersion: version,
  },
  {
    name: 'INVENTORY_LEVELS_DISCONNECT',
    route: '/webhooks/inventory-levels/disconnect',
    apiVersion: version,
  },
  {
    name: 'INVENTORY_LEVELS_UPDATE',
    route: '/webhooks/inventory-levels/update',
    apiVersion: version,
  },
  { name: 'ORDERS_CANCELLED', route: '/webhooks/orders/cancelled', apiVersion: version },
  { name: 'ORDERS_CREATE', route: '/webhooks/orders/create', apiVersion: version },
  { name: 'ORDERS_DELETE', route: '/webhooks/orders/delete', apiVersion: version },
  { name: 'ORDERS_EDITED', route: '/webhooks/orders/edited', apiVersion: version },
  { name: 'ORDERS_FULFILLED', route: '/webhooks/orders/fulfilled', apiVersion: version },
  { name: 'ORDERS_PAID', route: '/webhooks/orders/paid', apiVersion: version },
  {
    name: 'ORDERS_PARTIALLY_FULFILLED',
    route: '/webhooks/orders/partially-fulfilled',
    apiVersion: version,
  },
  { name: 'ORDERS_UPDATED', route: '/webhooks/orders/updated', apiVersion: version },
  {
    name: 'ORDER_TRANSACTIONS_CREATE',
    route: '/webhooks/orders-transactions/create',
    apiVersion: version,
  },
  { name: 'PRODUCTS_CREATE', route: '/webhooks/products/create', apiVersion: version },
  { name: 'PRODUCTS_DELETE', route: '/webhooks/products/delete', apiVersion: version },
  { name: 'PRODUCTS_UPDATE', route: '/webhooks/products/update', apiVersion: version },
  { name: 'REFUNDS_CREATE', route: '/webhooks/refunds/create', apiVersion: version },
  { name: 'SHOP_UPDATE', route: '/webhooks/shop/update', apiVersion: version },
  { name: 'TENDER_TRANSACTIONS_CREATE', route: '/webhooks/tender/transactions_create', apiVersion: version },
];