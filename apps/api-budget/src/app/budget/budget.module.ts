import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BudgetController } from './budget.controller';
import { Budget } from './budget.entity';
import { BudgetService } from './budget.service';

@Module({
  imports: [TypeOrmModule.forFeature([Budget])],
  providers: [BudgetService],
  controllers: [BudgetController],
  exports: [TypeOrmModule],
})
export class BudgetModule {}
