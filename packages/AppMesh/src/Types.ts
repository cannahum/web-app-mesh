export type Widget = (...args: any) => any;

export interface IWidgetConfig {
  name: string;
  version: string;
  executable: Widget;
  dependencies?: IWidgetConfig[];
  routes?: any;
}

export interface IWidgetEntry {
  name: string;
  version: string;
  url?: string;
  config?: IWidgetConfig;
}

export interface INotLoadedWidgetEntry extends IWidgetEntry {
  url: string;
  config: undefined;
}

export interface ILoadedWidgetEntry extends IWidgetEntry {
  config: IWidgetConfig;
  url: undefined;
}
