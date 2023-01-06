import { InjectRepository } from '@nestjs/typeorm';
import {
  DeepPartial,
  FindManyOptions,
  FindOptionsWhere,
  QueryRunner,
  Repository,
} from 'typeorm';
import { Budget } from './budget.model';

export class BudgetRepositoryAdapterService {
  constructor(
    @InjectRepository(Budget) private budgetRepsoitory: Repository<Budget>,
  ) {}

  create(entityLike: DeepPartial<Budget>) {
    return this.budgetRepsoitory.create(entityLike);
  }

  async findBy(where: FindOptionsWhere<Budget> | FindOptionsWhere<Budget>[]) {
    return await this.budgetRepsoitory.findBy(where);
  }

  async findAll(options?: FindManyOptions<Budget>) {
    return await this.budgetRepsoitory.find(options);
  }

  createQueryBuilder(alias?: string, queryRunner?: QueryRunner) {
    return this.budgetRepsoitory.createQueryBuilder(alias, queryRunner);
  }
}
