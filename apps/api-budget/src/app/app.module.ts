import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@/shared/in-memory-db';
import { BudgetModule } from './budget/budget.module';

@Module({
  imports: [BudgetModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
