import { Test, TestingModule } from '@nestjs/testing';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { BudgetService } from './budget.service';
import { BudgetModelBuilder } from './builders/budget.model.builder';
import { BudgetModelListBuilder } from './builders/budget.model.list.builder';

describe('BudgetService', () => {
  let service: BudgetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BudgetService],
    }).compile();

    service = module.get<BudgetService>(BudgetService);
  });

  test('should add a budget', async () => {
    const budget1: CreateBudgetDto = {
      name: '2024 Budget',
      description: 'This is the budget for 2024',
      year: 2024,
    };

    const expectedResult = service.createBudget(budget1);
    const { _id } = expectedResult;

    const actualResult = service.findBudgetById(_id);

    expect(actualResult).toEqual(expectedResult);
  });

  test('should get a budget by ID', async () => {
    const expectedResult = new BudgetModelBuilder({
      id: '1',
      name: '2024 Budget',
      year: 2024,
    })
      .setDescription('2024 Budget')
      .create();

    service.setBudgets = [expectedResult];
    const { _id } = expectedResult;

    const actualResult = service.findBudgetById(_id);

    expect(actualResult).toEqual(expectedResult);
  });

  test('should get all budgets', async () => {
    const expectedResult = new BudgetModelListBuilder()
      .addToList()
      .createBudget({ id: '1', name: '2023 Budget', year: 2023 })
      .addBudgetToList()
      .createBudget({ id: '2', name: '2024 Budget', year: 2024 })
      .addBudgetToList()
      .createList();

    service.setBudgets = expectedResult;

    const actualResult = service.getAllBudgets();

    expect(actualResult).toEqual(expectedResult);
  });
});
