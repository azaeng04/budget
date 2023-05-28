import { TypeOrmModule } from '@nestjs/typeorm';
import { createDatabase, setupDataSource } from '../../e2e/setup';

export const databaseImports = [
  TypeOrmModule.forRootAsync({
    useFactory: () => ({
      type: 'postgres',
      migrationsRun: false,
    }),
    dataSourceFactory: async () => {
      if (process.env.NODE_ENV === 'test') {
        console.log('go here');
        return setupDataSource();
      } else return createDatabase();
    },
  }),
];
