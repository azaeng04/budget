import { Injectable } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { BudgetRepositoryAdapterService } from './budget.adapter.service';
import { GetBudgetsFilterDto } from './dto/get-budgets-filter.dto';
import { Budget } from './budget.entity';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@Injectable()
export class BudgetRepository {
  constructor(
    private budgetRepositoryAdapterService: BudgetRepositoryAdapterService
  ) {}

  async create(createBudgetDto: CreateBudgetDto) {
    const { name, description, year } = createBudgetDto;
    const createdBudget = await this.budgetRepositoryAdapterService.save({
      name,
      description,
      year,
    });
    return createdBudget;
  }

  async findById(id: string) {
    const budget = await this.budgetRepositoryAdapterService.findOne({
      where: { id },
    });
    return budget;
  }

  async findAll(filterDto?: GetBudgetsFilterDto) {
    if (!filterDto) return await this.budgetRepositoryAdapterService.find();
    const { search } = filterDto;

    const query =
      this.budgetRepositoryAdapterService.createQueryBuilder('budget');

    query.where(
      '(budget.id LIKE LOWER(:search) OR LOWER(budget.name) LIKE LOWER(:search) OR LOWER(budget.description) LIKE LOWER(:search) OR budget.year LIKE LOWER(:search))',
      { search: `%${search}%` }
    );

    const budgets = await query.getMany();
    return budgets;
  }

  async update(id: string, updateBudgetDto: UpdateBudgetDto) {
    const budget = await this.budgetRepositoryAdapterService.findOne({
      where: { id },
    });
    if (budget) {
      budget.name = updateBudgetDto.name;
      budget.description = updateBudgetDto.description;
      budget.year = updateBudgetDto.year;
      const updatedBudget = await this.budgetRepositoryAdapterService.save(
        budget
      );
      return updatedBudget;
    } else {
      throw new Error(`Budget with ID: ${id} not found`);
    }
  }

  async deleteById(id: string) {
    const budget = await this.findById(id);
    // return await this.budgetRepositoryAdapterService.remove(budget);
  }

  async deleteAll(budgets: Budget[]) {
    return await this.budgetRepositoryAdapterService.remove(budgets);
  }
}
