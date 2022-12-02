import axios from 'axios';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { BudgetModule } from '../../src/budget/budget.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [BudgetModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    await app.close();
    await app.listen(3333, 'localhost');
  });

  afterEach(async () => {
    await app.close();
  });

  it('/budget/create (POST)', async () => {
    const expected = {
      id: expect.any(String),
      name: 'Test',
      description: 'This is a test',
      year: 2022,
    };

    const { data: actual } = await axios.request({
      baseURL: 'http://localhost:3333',
      url: '/budget/create',
      method: 'POST',
      data: {
        name: 'Test',
        description: 'This is a test',
        year: 2022,
      },
    });

    expect(actual).toEqual(expected);
  });
});
