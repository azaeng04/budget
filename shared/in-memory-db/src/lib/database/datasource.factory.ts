import { DataSource } from 'typeorm';
// import { config } from './datasource';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export enum DataSourceInstanceEnum {
  FIRST = 'first',
  SECOND = 'second',
  THIRD = 'third',
}

export class DataSourceFactory {
  private dataSource: Map<string, DataSource> = new Map();

  constructor(private config: TypeOrmModuleOptions & PostgresConnectionOptions) {}

  getDataSource(type = DataSourceInstanceEnum.FIRST) {
    if (this.dataSource.has(DataSourceInstanceEnum.FIRST)) {
      return this.dataSource.get(DataSourceInstanceEnum.FIRST);
    } else if (this.dataSource.has(DataSourceInstanceEnum.SECOND)) {
      return this.dataSource.get(DataSourceInstanceEnum.SECOND);
    } else if (this.dataSource.has(DataSourceInstanceEnum.THIRD)) {
      return this.dataSource.get(DataSourceInstanceEnum.THIRD);
    } else {
      this.dataSource.set(type, new DataSource(this.config));
      return this.dataSource.get(type);
    }
  }
}
