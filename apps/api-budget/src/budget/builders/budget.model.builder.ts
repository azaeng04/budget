import { Budget } from '../budget.model';
import { BudgetModelListBuilder } from './budget.model.list.builder';

export interface IBudgetModel {
  id?: string;
  name?: string;
  year?: number;
  budgetModelListBuilder?: BudgetModelListBuilder;
}

export class BudgetModelBuilder {
  private id: string;
  private name: string;
  private year: number;
  private budgetModelListBuilder: BudgetModelListBuilder;
  private description: string;

  public constructor(budgetModel: IBudgetModel) {
    this.id = budgetModel?.id ?? '';
    this.name = budgetModel?.name ?? '';
    this.year = budgetModel?.year ?? 0;
    this.budgetModelListBuilder = budgetModel?.budgetModelListBuilder ?? null;
  }

  setDescription(description: string) {
    this.description = description;
    return this;
  }

  private buildBudgetModel(builder: BudgetModelBuilder) {
    const budget = new Budget(builder.id, builder.name, builder.year);
    budget.description = builder.description;
    return budget;
  }

  public create() {
    return this.buildBudgetModel(this);
  }

  public addBudgetToList() {
    const budget = this.create();
    this.budgetModelListBuilder.addBudget(budget);
    return this.budgetModelListBuilder;
  }
}
