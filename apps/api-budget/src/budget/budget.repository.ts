import { Injectable } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { BudgetRepositoryAdapterService } from './budget.adapter.service';
import { GetBudgetsFilterDto } from './dto/get-budgets-filter.dto';

@Injectable()
export class BudgetRepository {
  constructor(
    private budgetRepositoryAdapterService: BudgetRepositoryAdapterService,
  ) {}

  createBudget(createBudgetDto: CreateBudgetDto) {
    const { name, description, year } = createBudgetDto;
    const createdBudget = this.budgetRepositoryAdapterService.create({
      name,
      description,
      year,
    });
    return createdBudget;
  }

  async findById(id: string) {
    if (id === '1')
      return await this.budgetRepositoryAdapterService.findBy({ id });
  }

  async findAll(filterDto?: GetBudgetsFilterDto) {
    if (!filterDto) return await this.budgetRepositoryAdapterService.findAll();
    const { search } = filterDto;

    const query =
      this.budgetRepositoryAdapterService.createQueryBuilder('budget');

    query
      .where('(LOWER(budget.id) LIKE LOWER(:search)', { search: `%${search}%` })
      .orWhere('LOWER(budget.name) LIKE LOWER(:search)', {
        search: `%${search}%`,
      })
      .orWhere('LOWER(budget.description) LIKE LOWER(:search)', {
        search: `%${search}%`,
      })
      .orWhere('LOWER(budget.year) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });

    query.where(
      '(LOWER(budget.id) LIKE LOWER(:search) OR LOWER(budget.name) LIKE LOWER(:search) OR LOWER(budget.description) LIKE LOWER(:search) OR LOWER(budget.year) LIKE LOWER(:search))',
      { search: `%${search}%` },
    );

    const budgets = await query.getMany();
    return budgets;
  }
}
