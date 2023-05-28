/* eslint-disable @typescript-eslint/no-var-requires */

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Budget } from '../../src/budget/budget.entity';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import {
  DataSourceFactory,
  DataSourceInstanceEnum,
} from './datasource.factory';
require('dotenv').config();

let config: TypeOrmModuleOptions & PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/../**/*.entity.ts'],
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

export const datasource = new DataSourceFactory().getDataSource();
export { config };
