import { Injectable, Logger } from '@nestjs/common';
import printf from 'printf';
import moment from 'moment';
import chalk, { Chalk } from 'chalk';

@Injectable()
export class LoggerService extends Logger {
  private time() {
    return moment.utc().format('YYYY-MM-DD HH:mm:ss.SSS');
  }

  private format(type: string, color: Chalk, context: string, message: string) {
    return printf(
      '%s %-5s %s - [%-15s] : %s',
      this.time(),
      color.bold(type),
      chalk.magenta(process.pid.toString()),
      context,
      color(message),
    );
  }

  log(message: string, context: string) {
    console.log(this.format('INFO', chalk.green, context, message));
  }

  http(message: string, context: string) {
    console.log(this.format('HTTP', chalk.cyan, context, message));
  }

  error(message: string, trace?: string, context?: string) {
    console.error(this.format('ERROR', chalk.red, context, message));
  }
}
