import { Injectable } from '@nestjs/common';
import { QueryRunner, Repository } from 'typeorm';
import { IGenericRepositoryService } from './generic-repository-service.interface';

@Injectable()
export class GenericRepositoryService<T extends { id: ID }, ID>
  implements IGenericRepositoryService<T, ID>
{
  constructor(private readonly entityRepository: Repository<T>) {}

  async findAll(): Promise<T[]> {
    return await this.entityRepository.find();
  }

  async findOneById(id: ID): Promise<T> {
    return await this.entityRepository.findOne(id);
  }

  async findOneByCondition(condition: Partial<T>): Promise<T> {
    const queryBuilder = await this.createQueryBuilder();
    let isFirstCondition = true;

    for (const [key, value] of Object.entries(condition)) {
      if (isFirstCondition) {
        queryBuilder.where(`${key} = :${key}`, { [key]: value });
        isFirstCondition = false;
      } else {
        queryBuilder.andWhere(`${key} = :${key}`, { [key]: value });
      }
    }

    return await queryBuilder.getOne();
  }

  async create(entity: T): Promise<T> {
    return await this.entityRepository.save(entity);
  }

  async update(id: ID, entity: Partial<T>): Promise<T> {
    const queryBuilder = await this.createQueryBuilder();
    await queryBuilder.update().set(entity).where('id = :id', { id }).execute();

    const updatedEntity = await this.findOneById(id);
    return updatedEntity;
  }

  async delete(id: ID): Promise<void> {
    const queryBuilder = await this.createQueryBuilder();
    await queryBuilder.delete().where('id = :id', { id }).execute();
  }

  async createQueryBuilder(alias?: string, queryRunner?: QueryRunner) {
    return this.entityRepository.createQueryBuilder(alias, queryRunner);
  }
}
