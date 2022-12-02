import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateBudgetDto } from './dto/budget.dto';
import { Budget } from './budget.model';

@Injectable()
export class BudgetService {
  private budgets: Budget[] = [];

  createBudget(budgetDto: CreateBudgetDto) {
    const { name, description, year } = budgetDto;
    const budget: Budget = {
      id: randomUUID(),
      name,
      description,
      year,
    };
    return budget;
  }
}
