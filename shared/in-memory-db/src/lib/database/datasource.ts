/* eslint-disable @typescript-eslint/no-var-requires */

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import {
  DataSourceFactory,
} from './datasource.factory';
require('dotenv').config();

let config: TypeOrmModuleOptions & PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? +process.env.DB_PORT : 0,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/**/*.entity.ts'],
  synchronize: false,
  migrationsRun: false,
  migrations: [__dirname + '../migrations/*.ts'],
};

switch (process.env.NODE_ENV) {
  case 'test':
    config = {
      ...config,
      migrationsRun: false,
      migrationsTransactionMode: 'each',
      synchronize: false,
    };
    break;
}

export const datasource = new DataSourceFactory(config).getDataSource();
export { config };
