import { Injectable, NestMiddleware } from '@nestjs/common';
import morgan from 'morgan';
import { Response, Request, NextFunction } from 'express';
import { LoggerStream } from './logger.stream';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly stream: LoggerStream) {}

  private readonly options: morgan.Options = {
    stream: this.stream,
  };

  use(req: Request, res: Response, next: NextFunction) {
    morgan(
      ':remote-addr ":method :url HTTP/:http-version" :status :res[content-length]',
      this.options,
    )(req, res, next);
  }
}
