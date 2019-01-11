import {
  isValidNotLoadedWidgetEntry,
  isValidLoadedWidgetEntry,
  isValidWidgetConfig,
  isValidWidgetEntry,
} from './validators';

const SEPARATOR = '!';
let widgetRegistry: IWidgetRegistry;

export default class AppMesh {

  private requireFunc: (...args: any) => Promise<any>;

  constructor(requireFunc: (...args: any) => Promise<any>) {
    this.requireFunc = requireFunc;
    widgetRegistry = {};
  }

  // public get widgetRegistry(): IWidgetRegistry {
  //   return widgetRegistry;
  // }
  //
  // public set widgetRegistry(x: IWidgetRegistry) {
  //   throw Error('Can\'t touch this!');
  // }

  public async preloadWidget(widgetId: string): Promise<void> {

  }

  public async loadWidget(widgetId: string): Promise<void> {

  }

  public registerWidgets(listOfWidgetEntries: IWidgetEntry[]): void {

    if (!Array.isArray(listOfWidgetEntries)) {
      throw Error('listOfWidgetEntries must be an array!');
    }

    for (const entry of listOfWidgetEntries) {

      if (!isValidWidgetEntry(entry)) {
        throw Error(`Invalid Widget Entry, ${JSON.stringify(entry)}`);
      }

      const { name, version, url } = entry;
      const id = ['widget', name, version].join(SEPARATOR);

      let registration: IWidgetAccount = {
        id,
        name,
        version,
        metaData: {
          wasLoadedInRuntime: false,
          wasPreloaded: false,
          loadingRum: 0,
          hasBeenExecuted: false,
          executionAmount: 0,
        },
        hasBeenLoaded: false,
      };

      if (isValidLoadedWidgetEntry(entry)) {
        const { executable, config } = entry;

        registration = {
          ...registration,
          executable,
          config,
          hasBeenLoaded: true,
        } as ILoadedWidgetAccount;
      }
      else if (isValidNotLoadedWidgetEntry(entry)) {
        registration = {
          ...registration,
          url,
        } as INotLoadedWidgetAccount;
      }
      else {
        throw Error(`Invalid Widget Entry: Please choose ILoadedWidgetEntry or INonLoadedWidgetEntry. Passed: ${JSON.stringify(entry)}`);
      }

      widgetRegistry[id] = registration;
    }
  }

  private async ensureWidgetIsLoaded(widgetId: string): Promise<void> {

    if (widgetRegistry.hasOwnProperty(widgetId)) {

      const widgetAccount: IWidgetAccount = widgetRegistry[widgetId];

      if (widgetAccount.hasBeenLoaded) {
        return;
      }

      // do Something with the url here - like requirejs.
      const widgetModule: any = await new Promise((res) => {
        this.requireFunc([widgetAccount.url as string], (someModule: any) => res(someModule));
        res();
      });

      if (!isValidWidgetConfig(widgetModule)) {
        throw Error(`The loaded widget ${widgetId} is not a valid module`);
      }

      widgetAccount.config = widgetModule;
    }
  }
}

interface IWidgetRegistry {
  [index: string]: IWidgetAccount;
}

interface IWidgetAccount {
  id: string;
  name: string;
  version: string;
  hasBeenLoaded: boolean;
  url?: string;
  executable?: Widget;
  config?: IWidgetConfig;
  metaData: IWidgetMetaData;
}

interface INotLoadedWidgetAccount extends IWidgetAccount {
  executable: undefined;
  config: undefined;
  url: string;
}

interface ILoadedWidgetAccount extends IWidgetAccount {
  executable: Widget;
  config: IWidgetConfig;
}

type Widget = (...args: any) => any;

interface IWidgetMetaData {
  wasLoadedInRuntime: boolean;
  wasPreloaded: boolean;
  loadingRum: number;
  hasBeenExecuted: boolean;
  executionAmount: number;
}

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
