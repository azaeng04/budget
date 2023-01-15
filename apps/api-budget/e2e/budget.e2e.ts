import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { BudgetController } from '../src/budget/budget.controller';
import { BudgetService } from '../src/budget/budget.service';
import * as request from 'supertest';

const PORT_NUMBER_MAX = 65536;
const PORT_NUMBER_MIN = 1024;

describe(`Budget E2E`, () => {
  let app: INestApplication;

  beforeAll(async () => {
    const randomPort = Math.floor(
      Math.random() * (PORT_NUMBER_MAX - PORT_NUMBER_MIN),
    );
    const module = await Test.createTestingModule({
      controllers: [BudgetController],
      providers: [BudgetService],
    }).compile();
    app = module.createNestApplication();
    app.listen(randomPort);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should ', async () => {
    return request(app.getHttpServer()).get('/budget').expect(200).expect([]);
  });
});
