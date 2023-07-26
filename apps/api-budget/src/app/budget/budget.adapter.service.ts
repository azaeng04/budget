import { InjectRepository } from '@nestjs/typeorm';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  QueryRunner,
  RemoveOptions,
  Repository,
} from 'typeorm';
import { Budget } from './budget.entity';

export class BudgetRepositoryAdapterService {
  constructor(
    @InjectRepository(Budget) private budgetRepsoitory: Repository<Budget>,
  ) {}

  async save(entityLike: DeepPartial<Budget>) {
    return this.budgetRepsoitory.save(entityLike);
  }

  async findBy(where: FindOptionsWhere<Budget> | FindOptionsWhere<Budget>[]) {
    return await this.budgetRepsoitory.findBy(where);
  }

  async findOne(options: FindOneOptions<Budget>) {
    return await this.budgetRepsoitory.findOne(options);
  }

  async find(options?: FindManyOptions<Budget>) {
    return await this.budgetRepsoitory.find(options);
  }

  createQueryBuilder(alias?: string, queryRunner?: QueryRunner) {
    return this.budgetRepsoitory.createQueryBuilder(alias, queryRunner);
  }

  async remove(entity: Budget, options?: RemoveOptions): Promise<Budget>;
  async remove(entities: Budget[], options?: RemoveOptions): Promise<Budget[]>;

  remove(
    entity: Budget | Budget[],
    options?: RemoveOptions,
  ): Promise<Budget[]> | Promise<Budget> {
    if (entity instanceof Budget) {
      return this.budgetRepsoitory.remove(entity, options);
    } else {
      return this.budgetRepsoitory.remove(entity, options);
    }
  }
}
