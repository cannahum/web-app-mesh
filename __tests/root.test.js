const { expect } = require('chai');

require('../AppMesh/__tests/root.test.js');
require('../Sandbox/__tests/root.test.js');

describe('root test', () => {

  it('should make assertions', () => {
    expect(true).to.equal(true);
  });

});
