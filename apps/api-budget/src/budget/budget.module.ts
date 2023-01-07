import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BudgetRepositoryAdapterService } from './budget.adapter.service';
import { BudgetController } from './budget.controller';
import { Budget } from './budget.model';
import { BudgetRepository } from './budget.repository';
import { BudgetService } from './budget.service';

@Module({
  imports: [TypeOrmModule.forFeature([Budget])],
  controllers: [BudgetController],
  providers: [BudgetService, BudgetRepository, BudgetRepositoryAdapterService],
  exports: [BudgetRepository],
})
export class BudgetModule {}
