import React from 'react';

let widgetRegistry: IWidgetRegistry;

export default class WebAppMesh {

  constructor() {
    widgetRegistry = {};
  }

  public get widgetRegistry(): IWidgetRegistry {
    return widgetRegistry;
  }

  public set widgetRegistry(x: IWidgetRegistry) {
    throw Error('Can\'t touch this!');
  }

  public async preloadWidget(widgetId: string): Promise<void> {

  }

  public async loadWidget(widgetId: string): Promise<void> {

  }

  public registerWidgets(listOfWidgetConfigs: IWidgetConfig[]): void {

  }

  private async ensureWidget(widgetId: string): Promise<void> {

  }
}

interface IWidgetRegistry {
  [ index: string ]: IWidgetAccount;
}

interface IWidgetAccount {
  id: string;
  name: string;
  version: string;
  hasBeenLoaded: boolean;
  url?: string;
  executable?: Widget;
  metaData: IWidgetMetaData;
}

interface IBundledWidget extends IWidgetAccount {
  executable: Widget;
}

interface IRuntimeWidget extends IWidgetAccount {
  url: string;
}

type Widget = (...args: any) => any | React.Component;

interface IWidgetMetaData {
  wasLoadedInRuntime: boolean;
  wasPreloaded: boolean;
  loadingRum: number;
  hasBeenExecuted: boolean;
  executionAmount: boolean;
}

interface IWidgetConfig {
  name: string;
  version: string;
  id?: string;
  executable?: Widget;
  url?: string;
}

interface IBundledWidgetConfig extends IWidgetConfig {
  executable: Widget;
}

interface IRuntimeWidgetConfig extends IWidgetConfig {
  url: string;
}
