import { Module } from '@nestjs/common';
import { databaseImports } from './database.imports';

@Module({
  imports: [...databaseImports],
  exports: [...databaseImports],
})
export class DatabaseModule {}
