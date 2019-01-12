export default class Logger {

  public static debug(...args: any) {
    // tslint:disable-next-line no-console
    console.debug.call(this, ...args);
  }

  public static info(...args: any) {
    // tslint:disable-next-line no-console
    console.info.call(this, ...args);
  }

  public static warn(...args: any) {
    // tslint:disable-next-line no-console
    console.warn.call(this, ...args);
  }

  public static error(...args: any) {
    // tslint:disable-next-line no-console
    console.error.call(this, ...args);
  }
}
