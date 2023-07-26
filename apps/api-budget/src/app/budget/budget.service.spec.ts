import { Test, TestingModule } from '@nestjs/testing';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { BudgetService } from './budget.service';
import { Budget } from './budget.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { setupInMemoryDataSource } from '@/shared/in-memory-db';
import { apiBudgetDbConfig } from '../../config/database/config';

describe('BudgetService', () => {
  let dataSource: DataSource;
  let service: BudgetService;

  beforeEach(async () => {
    dataSource = await setupInMemoryDataSource(apiBudgetDbConfig);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BudgetService,
        {
          provide: getRepositoryToken(Budget),
          useValue: dataSource.getRepository(Budget),
        },
      ],
    }).compile();

    service = module.get(BudgetService);
  });

  afterEach(async () => {
    await dataSource.destroy();
  });

  test('should add a budget', async () => {
    const budget1: CreateBudgetDto = {
      name: '2024 Budget',
      description: 'This is the budget for 2024',
      year: 2024,
    };

    const expectedResult = await service.createBudget(budget1);
    const { id } = expectedResult;

    const actualResult = await service.findBudgetById(id);

    expect(actualResult).toEqual(expectedResult);
  });

  test('should get a budget by ID', async () => {
    const createBudgetDto: CreateBudgetDto = {
      name: '2024 Budget',
      description: '2024 Budget',
      year: 2024,
    };

    const expectedResult = {
      id: expect.any(String),
      name: '2024 Budget',
      description: '2024 Budget',
      year: 2024,
    };
    const budget = await service.createBudget(createBudgetDto);
    const { id } = budget;

    const actualResult = await service.findBudgetById(id);

    expect(actualResult).toEqual(expectedResult);
  });

  test('should get all budgets', async () => {
    const expectedResult: Budget[] = [
      {
        id: expect.any(String),
        name: '2023 Budget',
        description: '2023 Budget',
        year: 2023,
      },
      {
        id: expect.any(String),
        name: '2024 Budget',
        description: '2024 Budget',
        year: 2024,
      },
    ];

    await service.createBudget({
      name: '2023 Budget',
      description: '2023 Budget',
      year: 2023,
    });

    await service.createBudget({
      name: '2024 Budget',
      description: '2024 Budget',
      year: 2024,
    });

    const actualResult = await service.getAllBudgets();

    expect(actualResult).toEqual(expectedResult);
  });
});
