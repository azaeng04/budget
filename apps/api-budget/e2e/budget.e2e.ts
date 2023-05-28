import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { setupDataSource } from './setup';
import { BudgetRepository } from '../src/budget/budget.repository';
import { Budget } from '../src/budget/budget.entity';
import { DataSource } from 'typeorm';
import { AppModule } from '../src/app.module';

describe(`Budget E2E`, () => {
  let app: INestApplication;
  let budgetRepo: BudgetRepository;

  beforeEach(async () => {
    const dataSource = await setupDataSource();

    const module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(DataSource)
      .useValue(dataSource)
      .compile();
    app = module.createNestApplication();
    budgetRepo = await app.get(BudgetRepository);
    await app.listen(3000);
  });

  afterEach(async () => {
    const budgets = await budgetRepo.findAll();
    await budgetRepo.deleteAll(budgets);
    await app.close();
  });

  test('should findall budgets', async () => {
    const createdBudget = await budgetRepo.create({
      name: 'My Budget',
      description: 'My Budget',
      year: 2024,
    });
    const expected: Budget[] = [];
    expected.push(createdBudget);
    const actual = await budgetRepo.findAll();

    expect(expected).toEqual(actual);
  });

  test('should return all budgets matching search criteria on name', async () => {
    const createdBudget = await budgetRepo.create({
      name: 'My Budget Name',
      description: 'My Budget Description',
      year: 2024,
    });
    const search = createdBudget.name;
    const expected = [
      {
        id: expect.any(String),
        name: createdBudget.name,
        description: createdBudget.description,
        year: createdBudget.year,
      },
    ];
    const actual = await budgetRepo.findAll({ search });

    expect(expected).toEqual(actual);
  });

  test('should return all budgets matching search criteria on description', async () => {
    const createdBudget = await budgetRepo.create({
      name: 'My Budget Name',
      description: 'My Budget Description',
      year: 2024,
    });
    const search = createdBudget.description;
    const expected = [
      {
        id: expect.any(String),
        name: createdBudget.name,
        description: createdBudget.description,
        year: createdBudget.year,
      },
    ];
    const actual = await budgetRepo.findAll({ search });

    expect(expected).toEqual(actual);
  });

  test('should return all budgets matching search criteria on year', async () => {
    const createdBudget = await budgetRepo.create({
      name: 'My Budget Name',
      description: 'My Budget Description',
      year: 2024,
    });

    const search = `${createdBudget.year}`;
    const expected = [
      {
        id: expect.any(String),
        name: createdBudget.name,
        description: createdBudget.description,
        year: createdBudget.year,
      },
    ];
    const actual = await budgetRepo.findAll({ search });

    expect(expected).toEqual(actual);
  });

  test('should update a budget', async () => {
    const createdBudget = await budgetRepo.create({
      name: 'My Budget Name',
      description: 'My Budget Description',
      year: 2024,
    });

    const expected = {
      id: createdBudget.id,
      name: 'My New Budget Name',
      description: 'My New Budget Description',
      year: 2025,
    };

    createdBudget.name = 'My New Budget Name';
    createdBudget.description = 'My New Budget Description';
    createdBudget.year = 2025;

    await budgetRepo.update(createdBudget.id, createdBudget);
    const actual = await budgetRepo.findById(createdBudget.id);

    expect(actual).toEqual(expected);
  });

  test('should delete budget by ID', async () => {
    const createdBudget = await budgetRepo.create({
      name: 'My Budget Name',
      description: 'My Budget Description',
      year: 2024,
    });
    const expected = null;

    await budgetRepo.deleteById(createdBudget.id);
    const result = await budgetRepo.findById(createdBudget.id);

    expect(result).toEqual(expected);
  });

  test('should delete multiple entities', async () => {
    await budgetRepo.create({
      name: 'My Budget Name',
      description: 'My Budget Description',
      year: 2024,
    });
    await budgetRepo.create({
      name: 'My Budget Name',
      description: 'My Budget Description',
      year: 2025,
    });

    const expected = [];

    const budgets = await budgetRepo.findAll();
    await budgetRepo.deleteAll(budgets);
    const actual = await budgetRepo.findAll();

    expect(actual).toEqual(expected);
  });

  test('should ', async () => {
    const createdBudget = await budgetRepo.create({
      name: 'My Budget Name',
      description: 'My Budget Description',
      year: 2024,
    });
    const expected = {
      id: expect.any(String),
      name: createdBudget.name,
      description: createdBudget.description,
      year: createdBudget.year,
    };

    const actual = await budgetRepo.findById(createdBudget.id);

    expect(actual).toEqual(expected);
  });
});
