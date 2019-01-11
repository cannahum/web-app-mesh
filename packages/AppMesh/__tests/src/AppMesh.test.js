const { expect } = require('chai');

const { default: WebAppMesh } = require('../../src/AppMesh');


describe('WebAppMesh Tests', () => {

  it('should ...', () => {
    expect(true).to.equal(true);
  });

  describe('Constructor and Initialization', () => {

    it('should initialize without errors', () => {
      let mesh;

      expect(() => {
        mesh = new WebAppMesh();
      }).to.not.throw;
    });

    it('should have the public member functions', () => {
      const mesh = new WebAppMesh();

      expect(typeof mesh.loadWidget).to.equal('function');
      expect(typeof mesh.preloadWidget).to.equal('function');
      expect(typeof mesh.registerWidgets).to.equal('function');
    });

    it('should have non-modifiable registry object as a member', () => {
      const mesh = new WebAppMesh();
      expect(typeof mesh.widgetRegistry).to.equal('object');
      expect(() => {
        mesh.widgetRegistry = 'Hello';
      }).to.throw;
    });

  });

});
