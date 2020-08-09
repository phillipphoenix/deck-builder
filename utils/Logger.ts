export default class Logger {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  log(...messages: any[]) {
    console.log(`LOG: ${this.name}: `, messages);
  }

  warn(...messages: any[]) {
    console.warn(`LOG: ${this.name}: `, messages);
  }

  error(...messages: any[]) {
    console.error(`LOG: ${this.name}: `, messages);
  }
}
