import { StreamOptions } from 'morgan';
import { Injectable } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerStream implements StreamOptions {
  constructor(private readonly logger: LoggerService) {}

  write(str: string) {
    str = str.trim();
    this.logger.http(str, 'HttpLogger');
  }
}
