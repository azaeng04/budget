import { Budget } from '../budget.model';
import { BudgetModelBuilder, IBudgetModel } from './budget.model.builder';

export class BudgetModelListBuilder {
  listOfBudgets: Budget[];

  addToList() {
    this.listOfBudgets = [];
    return this;
  }

  addBudget(budget: Budget) {
    this.listOfBudgets.push(budget);
    return this;
  }

  createBudget(budget: IBudgetModel) {
    return new BudgetModelBuilder({ ...budget, budgetModelListBuilder: this });
  }

  createList() {
    return this.listOfBudgets;
  }
}
