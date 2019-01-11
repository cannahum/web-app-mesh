const { expect } = require('chai');

require('../packages/AppMesh/__tests/root.test.js');
require('../packages/Sandbox/__tests/root.test.js');

describe('root test', () => {

  it('should make assertions', () => {
    expect(true).to.equal(true);
  });

});
