import {
  CompatibilityIssue,
  getCompatibilityIssuesWithRequestedWidget,
  isValidLoadedWidgetEntry,
  isValidNotLoadedWidgetEntry,
  isValidWidgetConfig,
  isValidWidgetEntry,
} from './validators';

import { Logger } from '@web-app-mesh/sandbox';
import { IWidgetConfig, IWidgetEntry, Widget } from './Types';

let widgetRegistry: IWidgetRegistry;

export default class AppMesh {

  public static readonly SEPARATOR = '!';

  private readonly requireFunc: (...args: any) => Promise<any>;

  constructor(requireFunc: (...args: any) => Promise<any>) {
    this.requireFunc = requireFunc;
    widgetRegistry = {};
    Logger.debug('hey!');
  }

  public async preloadWidget(widgetId: string): Promise<void> {
    const widgetAccount: undefined | IWidgetAccount = widgetRegistry[widgetId];
    if (!widgetAccount) {
      throw Error(`No such widget account registered: ${widgetId}`);
    }

    if (isValidNotLoadedWidgetEntry(widgetAccount)) {
      const { url } = widgetAccount;

      const incomingWidgetModule = await this.requireFunc(url);

      this.digestWidget({
        widgetId,
        module: incomingWidgetModule,
      });
    }
  }

  public async loadWidget(widgetId: string): Promise<void> {
    await this.preloadWidget(widgetId);
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
      const id = ['widget', name, version].join(AppMesh.SEPARATOR);

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
      } else if (isValidNotLoadedWidgetEntry(entry)) {
        registration = {
          ...registration,
          url,
        } as INotLoadedWidgetAccount;
      } else {
        throw Error(`Invalid Widget Entry: Please choose ILoadedWidgetEntry or
        INonLoadedWidgetEntry. Passed: ${JSON.stringify(entry)}`);
      }

      widgetRegistry[id] = registration;
    }
  }

  private digestWidget({ widgetId, module }: any): void {

    const widgetAccount: IWidgetAccount = widgetRegistry[widgetId];

    if (!isValidWidgetConfig(module)) {
      throw Error(`The loaded widget ${widgetId} is not a valid module`);
    }

    const compatibilityIssues: CompatibilityIssue[] = getCompatibilityIssuesWithRequestedWidget(widgetId, module);
    if (compatibilityIssues.length > 0) {
      throw Error(`This widget module is not compatible with the requested widget ID of ${widgetId}:
        because: ${JSON.stringify(compatibilityIssues)}`);
    }

    widgetAccount.config = module;
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

interface IWidgetMetaData {
  wasLoadedInRuntime: boolean;
  wasPreloaded: boolean;
  loadingRum: number;
  hasBeenExecuted: boolean;
  executionAmount: number;
}
