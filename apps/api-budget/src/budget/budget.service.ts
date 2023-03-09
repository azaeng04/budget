import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { Budget } from './budget.model';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { BudgetModelBuilder } from './builders/budget.model.builder';

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
      (currentBudget) => currentBudget._id === id,
    );
    if (!budgetFound)
      throw new NotFoundException(`The budget with ID: ${id} cannot be found`);
    return budgetFound;
  }

  createBudget(budgetDto: CreateBudgetDto) {
    const { name, description, year } = budgetDto;
    const budget: Budget = new BudgetModelBuilder({
      id: randomUUID(),
      name,
      year,
    })
      .setDescription(description)
      .create();
    this.budgets.push(budget);
    return budget;
  }

  updateBudgetById(id: string, updateBudgetDto: UpdateBudgetDto) {
    const { description, name, year } = updateBudgetDto;
    const budgetToUpdate = this.findBudgetById(id);
    budgetToUpdate._description = description;
    budgetToUpdate._name = name;
    budgetToUpdate._year = year;
    return budgetToUpdate;
  }

  deleteBudgetById(id: string) {
    const budgetToDelete = this.findBudgetById(id);
    const newBudgets = this.budgets.filter(
      (budget) => budget._id !== budgetToDelete._id,
    );
    this.budgets = newBudgets;
  }
}
