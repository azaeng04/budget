import { Test, TestingModule } from '@nestjs/testing';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { BudgetService } from './budget.service';
import { Budget } from './budget.model';

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
    const { id } = expectedResult;

    const actualResult = service.findBudgetById(id);

    expect(actualResult).toEqual(expectedResult);
  });

  test('should get a budget by ID', async () => {
    const expectedResult: Budget = {
      id: '1',
      name: '2024 Budget',
      description: 'This is the budget for 2024',
      year: 2024,
    };

    service.setBudgets = [expectedResult];
    const { id } = expectedResult;

    const actualResult = service.findBudgetById(id);

    expect(actualResult).toEqual(expectedResult);
  });

  test('should get all budgets', async () => {
    const expectedResult: Budget[] = [
      {
        id: '1',
        name: '2023 Budget',
        description: 'This is the budget for 2023',
        year: 2023,
      },
      {
        id: '2',
        name: '2024 Budget',
        description: 'This is the budget for 2024',
        year: 2024,
      },
    ];

    service.setBudgets = expectedResult;

    const actualResult = service.getAllBudgets();

    expect(actualResult).toEqual(expectedResult);
  });
});
