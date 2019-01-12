import semver from 'semver';
import AppMesh from './AppMesh';
import {
  ILoadedWidgetEntry,
  INotLoadedWidgetEntry,
  IWidgetConfig,
  IWidgetEntry,
} from './Types';

export function isValidWidgetEntry(x: any): x is IWidgetEntry {
  if (typeof x !== 'object') {
    return false;
  }

  if (typeof x.name !== 'string') {
    return false;
  }

  if (!semver.valid(x.version)) {
    return false;
  }

  // Either a loaded widget entry - the config object is available
  // or it's a not-loaded widget entry - the url is a string.
  if (typeof x.config !== 'object' && typeof x.url !== 'string') {
    return false;
  }

  // But not both!
  // Gets confusing.
  if (typeof x.config === 'object' && typeof x.url === 'string') {
    return false;
  }

  return true;
}

export function isValidLoadedWidgetEntry(x: any): x is ILoadedWidgetEntry {
  return isValidWidgetEntry(x) && isValidWidgetConfig(x.config);
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

  if (typeof x.executable !== 'function') {
    return false;
  }

  return true;
}

export type CompatibilityIssue = string;

export function getCompatibilityIssuesWithRequestedWidget(
  widgetId: string,
  incomingWidgetModule: IWidgetConfig): CompatibilityIssue[] {

  const issues: CompatibilityIssue[] = [];

  const [, idVersion] = widgetId.split(AppMesh.SEPARATOR);
  const { version: widgetVersion } = incomingWidgetModule;

  if (!semver.satisfies(widgetVersion, idVersion)) {
    issues.push(`Version from the widget configuration ${widgetVersion} is not compatible with the version found on the
    AppMesh - ${idVersion}.`);
  }

  return issues;
}
