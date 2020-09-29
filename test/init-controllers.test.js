require('@babel/register')({
  presets: ['@babel/preset-env'],
  plugins: ['@babel/transform-runtime'],
});

var assert = require('chai').assert;
var initControllers = require('../server/controllers');

describe('Controller tests using ASSERT interface from CHAI module: ', () => {
  describe('Check status Function: ', () => {
    it("Check the returned value using: assert.equal(value,'value'): ", () => {
      let ctx = { body: { status: '', data: '' } };

      result = initControllers.status(ctx);
      assert.equal(result.status, 'success');
    });
  });
});
