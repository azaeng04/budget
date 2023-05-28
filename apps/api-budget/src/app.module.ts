import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BudgetModule } from './budget/budget.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [BudgetModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
