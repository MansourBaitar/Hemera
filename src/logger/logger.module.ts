import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerStream } from './logger.stream';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  providers: [LoggerService, LoggerStream],
})
export class LoggerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
