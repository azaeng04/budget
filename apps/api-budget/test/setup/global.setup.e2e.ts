import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';

module.exports = async function globalSetup(_, projectConfig) {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  await app.init();
  await app.close();
  await app.listen(projectConfig.globals.APP_PORT);
  globalThis.APP = app;
};
