export type Widget = (...args: any) => any;

export interface IWidgetConfig {
  id: string;
  name: string;
  version: string;
  executable: Widget;
  dependencies?: any[];
  routes?: any;
}

export interface IWidgetEntry {
  name: string;
  version: string;
  id?: string;
  executable?: Widget;
  url?: string;
}

export interface INotLoadedWidgetEntry {
  url: string;
}

export interface ILoadedWidgetEntry extends IWidgetEntry {
  executable: Widget;
  config: IWidgetConfig;
}
