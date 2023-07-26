import { TypeOrmModule } from '@nestjs/typeorm';
import setupInMemoryDataSource, {
  createDatabase,
} from '../shared-in-memory-db';
import { config } from './datasource';

export const databaseImports = [
  TypeOrmModule.forRootAsync({
    useFactory: () => ({
      type: 'postgres',
      migrationsRun: false,
    }),
    dataSourceFactory: async () => {
      if (process.env.NODE_ENV === 'test') {
        return setupInMemoryDataSource(config);
      } else return createDatabase(config);
    },
  }),
];
