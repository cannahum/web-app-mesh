export default class Logger {

  public static debug(...args: any) {
    // tslint:disable-next-line no-console
    console.debug.call(this, ...args);
  }
}
