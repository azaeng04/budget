import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { Budget } from './budget.model';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@Injectable()
export class BudgetService {
  private budgets: Budget[] = [];

  getAllBudgets() {
    return this.budgets;
  }

  set setBudgets(budgets: Budget[]) {
    this.budgets = budgets;
  }

  findBudgetById(id: string) {
    const budgetFound = this.budgets.find(
      (currentBudget) => currentBudget.id === id,
    );
    if (!budgetFound)
      throw new NotFoundException(`The budget with ID: ${id} cannot be found`);
    return budgetFound;
  }

  createBudget(budgetDto: CreateBudgetDto) {
    const { name, description, year } = budgetDto;
    const budget: Budget = {
      id: randomUUID(),
      name,
      description,
      year,
    };
    this.budgets.push(budget);
    return budget;
  }

  updateBudgetById(id: string, updateBudgetDto: UpdateBudgetDto) {
    const { description, name, year } = updateBudgetDto;
    const budgetToUpdate = this.findBudgetById(id);
    budgetToUpdate.description = description;
    budgetToUpdate.name = name;
    budgetToUpdate.year = year;
    return budgetToUpdate;
  }

  deleteBudgetById(id: string) {
    const budgetToDelete = this.findBudgetById(id);
    const newBudgets = this.budgets.filter(
      (budget) => budget.id !== budgetToDelete.id,
    );
    this.budgets = newBudgets;
  }
}
