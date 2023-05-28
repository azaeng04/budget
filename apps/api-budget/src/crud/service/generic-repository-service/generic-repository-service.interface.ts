export interface IGenericRepositoryService<T extends { id: ID }, ID> {
  findAll(): Promise<T[]>;
  findOneById(id: ID): Promise<T>;
  findOneByCondition(condition: Partial<T>): Promise<T>;
  create(entity: T): Promise<T>;
  update(id: ID, entity: Partial<T>): Promise<T>;
  delete(id: ID): Promise<void>;
}
