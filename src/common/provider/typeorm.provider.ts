import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export default TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: async (config: ConfigService): Promise<TypeOrmModuleOptions> => ({
    type: 'mongodb',
    url: config.get('database.url'),
    port: 27017,
    synchronize: true,
    autoLoadEntities: true,
    appname: 'octape',

    // -- mongodb deprecation warnings -----
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dropSchema:
      process.env.NODE_ENV === 'test' || config.get<boolean>('initialize'),
  }),
});
