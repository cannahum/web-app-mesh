const notLoadedWidget1 = {
  url: 'https://some.cdn.elsewhere.com/widget1',
  version: '1.0.0',
};

const notLoadedWidget2 = {
  name: 'notLoadedWidget2',
  version: '2.0.1',
};

const notLoadedWidget3 = {
  name: 'notLoadedWidget2',
  url: 'https://some.cdn.elsewhere.com/widget1',
};

// Loaded Widget Mocks
const widgetGenerator = (name) => () => `Hello! I'm widget ${name}`;

const loadedWidget1 = {
  name: 'loadedWidget1',
  url: 'https://some.cdn.elsewhere.com/widget1',
  version: '1.0.0',
  config: {
    name: 'loadedWidget1',
    version: '1.0.0',
  },
};

const loadedWidget2 = {
  name: 'loadedWidget2',
  version: '2.0.1',
  config: {
    name: 'loadedWidget1',
    executable: widgetGenerator('loadedWidget1'),
  },
};

const loadedWidget3 = {
  name: 'loadedWidget2',
  version: '2.0.1',
  config: {
    version: '1.0.0',
    executable: widgetGenerator('loadedWidget1'),
  },
};

module.exports = {
  notLoadedWidgets: [notLoadedWidget1, notLoadedWidget2, notLoadedWidget3],
  loadedWidgets: [loadedWidget1, loadedWidget2, loadedWidget3],
};
