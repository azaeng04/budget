/* eslint-disable @typescript-eslint/no-var-requires */

import { DataSourceFactory } from '@/shared/in-memory-db';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
// import { DataSourceFactory } from './datasource.factory';
require('dotenv').config();

let apiBudgetDbConfig: TypeOrmModuleOptions & PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? +process.env.DB_PORT : 0,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [join(__dirname, '/../../app/**/*.entity.ts')],
  synchronize: false,
  migrationsRun: false,
  migrations: [__dirname + '../migrations/*.ts'],
};

switch (process.env.NODE_ENV) {
  case 'test':
    apiBudgetDbConfig = {
      ...apiBudgetDbConfig,
      migrationsRun: false,
      migrationsTransactionMode: 'each',
      synchronize: false,
    };
    break;
}

export const datasource = new DataSourceFactory(apiBudgetDbConfig).getDataSource();
export { apiBudgetDbConfig };
