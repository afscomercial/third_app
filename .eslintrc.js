module.exports = {
  env: {
    es6: true,
  },
  extends: [
    'plugin:shopify/react',
    'plugin:shopify/polaris',
    'plugin:shopify/webpack',
  ],
  rules: {
    'import/no-unresolved': 'off',
  },
  overrides: [
    {
      files: ['*.test.*'],
      rules: {
        'shopify/jsx-no-hardcoded-content': 'off',
      },
    },
  ],
};
