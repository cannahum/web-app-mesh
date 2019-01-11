import { INotLoadedWidgetEntry, ILoadedWidgetEntry, IWidgetConfig, IWidgetEntry } from './AppMesh';

export function isValidWidgetEntry(x: any): x is IWidgetEntry {
  if (typeof x !== 'object') {
    return false;
  }

  if (typeof x.name !== 'string') {
    return false;
  }

  if (typeof x.version !== 'string') {
    return false;
  }

  return typeof x.excutable !== 'function' || typeof x.url !== 'string';
}

export function isValidLoadedWidgetEntry(x: any): x is ILoadedWidgetEntry {
  return isValidWidgetEntry(x) && typeof x.executable === 'function';
}

export function isValidNotLoadedWidgetEntry(x: any): x is INotLoadedWidgetEntry {
  return isValidWidgetEntry(x) && typeof x.url === 'string';
}

export function isValidWidgetConfig(x: any): x is IWidgetConfig {

  if (typeof x !== 'object') {
    return false;
  }

  if (typeof x.name !== 'string') {
    return false;
  }

  if (typeof x.version !== 'string') {
    return false;
  }

  return typeof x.excutable !== 'function' || typeof x.url !== 'string';
}
