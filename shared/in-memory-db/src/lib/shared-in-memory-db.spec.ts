import { join } from 'path';
import { config } from './database/datasource';
import sharedInMemoryDb from './shared-in-memory-db';


 //?
describe('sharedInMemoryDb', () => {
  it('should work', async () =>
  {
    const connection = await sharedInMemoryDb(config);
    connection.entityMetadatas //?
    expect(connection.isInitialized).toBe(true);
  });
});
