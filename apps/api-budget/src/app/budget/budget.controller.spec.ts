import { Test, TestingModule } from '@nestjs/testing';
import { BudgetController } from './budget.controller';
import { Budget } from './budget.entity';
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import setupInMemoryDataSource from 'shared/in-memory-db/src/lib/shared-in-memory-db';
import { apiBudgetDbConfig } from '../../config/database/config';
import { randomUUID } from 'crypto';

describe('BudgetController', () => {
  let controller: BudgetController;

  beforeEach(async () => {
    const dataSource = await setupInMemoryDataSource(apiBudgetDbConfig);
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BudgetController],
      providers: [
        BudgetService,
        {
          provide: getRepositoryToken(Budget),
          useValue: dataSource.getRepository(Budget),
        },
      ],
    }).compile();

    controller = module.get<BudgetController>(BudgetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a budget', async () => {
    const expected = {
      id: expect.any(String),
      name: '2022 Budget',
      description: 'This is the 2022 budget',
      year: 2022,
    };

    const budgetDto: CreateBudgetDto = {
      name: '2022 Budget',
      description: 'This is the 2022 budget',
      year: 2022,
    };

    const actual = await controller.createBudget(budgetDto);

    expect(actual).toEqual(expected);
  });

  it('should get all budgets', async () => {
    const budgetDto: CreateBudgetDto = {
      name: '2022 Budget',
      description: 'This is the 2022 budget',
      year: 2022,
    };

    const expected = [
      {
        id: expect.any(String),
        ...budgetDto,
      },
    ];

    await controller.createBudget(budgetDto);
    const actual = await controller.getAllBudgets();

    expect(actual).toEqual(expected);
  });

  it('should get a budget by ID', async () => {
    const budgetDto: CreateBudgetDto = {
      name: '2022 Budget',
      description: 'This is the 2022 budget',
      year: 2022,
    };

    const expected = {
      id: expect.any(String),
      ...budgetDto,
    };

    const createdBudget = await controller.createBudget(budgetDto);
    const actual = await controller.getBudgetByID(createdBudget.id);

    expect(actual).toEqual(expected);
  });

  it('should throw not found for budget that does not exist by ID', async () => {
    const id = randomUUID();
    const expected = `The budget with ID: ${id} cannot be found`;

    const actual = () => controller.getBudgetByID(id);

    expect(actual).rejects.toThrow(expected);
  });

  it('should update a budget by ID', async () => {
    const budgetDto: CreateBudgetDto = {
      name: '2022 Budget',
      description: 'This is the 2022 budget',
      year: 2022,
    };

    const updateBudgetDto: UpdateBudgetDto = {
      name: '2023 Budget',
      description: 'This is the 2023 budget',
      year: 2023,
    };

    const expected = {
      id: expect.any(String),
      ...updateBudgetDto,
    };

    const createdBudget = await controller.createBudget(budgetDto);
    const { id } = createdBudget;
    await controller.updateBudget(id, updateBudgetDto);
    const actual = await controller.getBudgetByID(id);

    expect(actual).toEqual(expected);
  });

  it('should delete a budget by ID', async () => {
    const budgetDto: CreateBudgetDto = {
      name: '2022 Budget',
      description: 'This is the 2022 budget',
      year: 2022,
    };

    const createdBudget = await controller.createBudget(budgetDto);
    const expected = `The budget with ID: ${createdBudget.id} cannot be found`;

    await controller.deleteBudgetById(createdBudget.id);
    const actual = () => controller.getBudgetByID(createdBudget.id);

    expect(actual).rejects.toThrow(expected);
  });
});
