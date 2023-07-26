import { setupInMemoryDataSource } from '@/shared/in-memory-db';
import { apiBudgetDbConfig } from './config';
import { DataSource } from 'typeorm';
import { join } from 'path';

describe('Database Config', () => {
  let result: DataSource;

  beforeEach(async () => {
    result = await setupInMemoryDataSource(apiBudgetDbConfig);
  });

  afterEach(async () => {
    await result.destroy();
  });

  it('should initialize connection to the database', async () => {
    const actual = result.isInitialized;

    expect(actual).toBe(true);
  });

  it('should load all entities', async () => {
    const actual = result.entityMetadatas.length;

    expect(actual).toBeGreaterThan(0);
  });
});
