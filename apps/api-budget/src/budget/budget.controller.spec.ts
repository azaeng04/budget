import { Test, TestingModule } from '@nestjs/testing';
import { BudgetController } from './budget.controller';
import { Budget } from './budget.entity';
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { setupDataSource } from '../../e2e/setup';
import { DataSource } from 'typeorm';
import { BudgetRepositoryAdapterService } from './budget.adapter.service';
import { BudgetRepository } from './budget.repository';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';

describe('BudgetController', () => {
  let controller: BudgetController;

  beforeEach(async () => {
    const dataSource = await setupDataSource();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BudgetController],
      providers: [
        BudgetService,
        BudgetRepository,
        BudgetRepositoryAdapterService,
        { provide: getRepositoryToken(Budget), useValue: dataSource },
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
      name: expected.name,
      description: expected.description,
      year: expected.year,
    };

    const actual = controller.createBudget(budgetDto);

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

    controller.createBudget(budgetDto);
    const actual = controller.getAllBudgets();

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

    const createdBudget = controller.createBudget(budgetDto);
    const actual = controller.getBudgetByID(createdBudget.id);

    expect(actual).toEqual(expected);
  });

  it('should throw not found for budget that does not exist by ID', async () => {
    const id = '1';
    const expected = `The budget with ID: ${id} cannot be found`;

    const actual = () => controller.getBudgetByID(id);

    expect(actual).toThrow(expected);
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

    const createdBudget = controller.createBudget(budgetDto);
    controller.updateBudget(createdBudget.id, updateBudgetDto);
    const actual = controller.getBudgetByID(createdBudget.id);

    expect(actual).toEqual(expected);
  });

  it('should delete a budget by ID', async () => {
    const budgetDto: CreateBudgetDto = {
      name: '2022 Budget',
      description: 'This is the 2022 budget',
      year: 2022,
    };

    const createdBudget = controller.createBudget(budgetDto);
    const expected = `The budget with ID: ${createdBudget.id} cannot be found`;

    controller.deleteBudgetById(createdBudget.id);
    const actual = () => controller.getBudgetByID(createdBudget.id);

    expect(actual).toThrow(expected);
  });
});
