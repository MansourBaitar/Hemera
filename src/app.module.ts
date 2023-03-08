import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ExceptionModule } from './exception/exception.module';
import { LoggerModule } from './logger/logger.module';
import { StatusModule } from './status/status.module';
import { ProjectModule } from './project/project.module';

import configuration from './common/helper/configuration';
import typeormProvider from './common/provider/typeorm.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ClientsModule.register([
      { name: 'STORAGE_SERVICE', transport: Transport.TCP },
    ]),
    typeormProvider,
    ExceptionModule,
    LoggerModule,
    StatusModule,
    ProjectModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
