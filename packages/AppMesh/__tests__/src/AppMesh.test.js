const { default: WebAppMesh } = require('../../lib/AppMesh');

describe('WebAppMesh Tests', () => {

  describe('Constructor and Initialization', () => {

    test('should initialize without errors', () => {
      let mesh;

      expect(() => {
        mesh = new WebAppMesh();
      }).not.toThrow();
    });

    test('should have the public member functions', () => {
      const mesh = new WebAppMesh();

      expect(typeof mesh.loadWidget).toEqual('function');
      expect(typeof mesh.preloadWidget).toEqual('function');
      expect(typeof mesh.registerWidgets).toEqual('function');
    });

  });

});
