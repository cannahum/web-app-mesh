describe('WebAppMesh Tests', () => {
  const { default: WebAppMesh } = require('../../lib/AppMesh');
  const {
    notLoadedWidgets: validNotLoadedWidgets,
    loadedWidgets: validLoadedWidgets,
  } = require('../../__mocks__/validWidgets');

  const {
    notLoadedWidgets: invalidNotLoadedWidgets,
    loadedWidgets: invalidLoadedWidgets,
  } = require('../../__mocks__/invalidWidgets');

  describe('Constructor and Initialization', () => {

    const fakeRequireFunc = () => {
    };

    test('should initialize without errors', () => {
      let mesh;

      expect(() => {
        mesh = new WebAppMesh(fakeRequireFunc);
      }).not.toThrow();
    });

    test('should save the require function as a member', () => {
      const mesh = new WebAppMesh(fakeRequireFunc);
      expect(typeof mesh.requireFunc).toEqual('function');
    });

    test('should have the public member functions', () => {
      const mesh = new WebAppMesh(fakeRequireFunc);

      expect(typeof mesh.loadWidget).toEqual('function');
      expect(typeof mesh.preloadWidget).toEqual('function');
      expect(typeof mesh.addWidgets).toEqual('function');
    });

    describe('AppMesh.prototype.addWidgets tests', () => {
      const mesh = new WebAppMesh(fakeRequireFunc);
      const registry = mesh.getWidgetRegistry();

      beforeEach(() => {
        for (const key in registry) {
          delete registry[key];
        }
      });

      test('should accept a parameter of type Array', () => {
        expect(() => mesh.addWidgets(true)).toThrow();
        expect(() => mesh.addWidgets('false')).toThrow();
        expect(() => mesh.addWidgets({ hello: 'world' })).toThrow();
      });

      test('should process the widgets and add them to the registry', () => {

        expect(Object.keys(registry).length).toEqual(0);
        mesh.addWidgets(validNotLoadedWidgets);
        expect(Object.keys(registry).length).toEqual(2);
        mesh.addWidgets(validLoadedWidgets);
        expect(Object.keys(registry).length).toEqual(4);

      });

      test('should not add a widget if another with the same name & version exists', () => {

        expect(Object.keys(registry).length).toEqual(0);
        mesh.addWidgets(validNotLoadedWidgets);
        expect(Object.keys(registry).length).toEqual(2);
        mesh.addWidgets([validNotLoadedWidgets[0]]);
        expect(Object.keys(registry).length).toEqual(2);

      });

      test('should throw an error if there is an invalid configuration', () => {
        expect(() => mesh.addWidgets(invalidNotLoadedWidgets)).toThrow();
        expect(() => mesh.addWidgets(invalidLoadedWidgets)).toThrow();
      });

      test('should not add any widgets if one of the widgets in the array is invalid', () => {
        expect(Object.keys(registry).length).toEqual(0);

        const customWdigets = [
          validNotLoadedWidgets[0],
          invalidLoadedWidgets[0],
        ];

        expect(() => mesh.addWidgets(customWdigets)).toThrow();
        expect(Object.keys(registry).length).toEqual(0);

      });

    });

  });

});
