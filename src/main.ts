import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { LoggerService } from './logger/logger.service';
import { ProblemDetailFilter } from 'problem-details/build/nestjs';
import { NotFoundFilter } from './common/filter/notfound.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: false,
  });
  // const app = await NestFactory.create(AppModule);

  // -- setup logger -----------------------
  const logger = app.get(LoggerService);
  app.useLogger(logger);

  // -- security settings ------------------
  app.enableCors();

  // -- register exception filters ---------
  // app.useGlobalFilters(new ProblemDetailFilter());
  // app.useGlobalFilters(new NotFoundFilter());

  // -- retrieve configuration -------------
  const config = app.get(ConfigService);
  const port = config.get<number>('port');

  // -- start application ------------------
  await app.listen(port);

  logger.log(`Application started listening on port "${port}"`);
}
bootstrap();
