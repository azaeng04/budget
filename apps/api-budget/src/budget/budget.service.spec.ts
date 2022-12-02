import { Test, TestingModule } from '@nestjs/testing';
import { CreateBudgetDto } from './dto/budget.dto';
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
      name: '2023 Budget',
      description: 'This is the budget for 2023',
      year: 2023,
    };

    const { name, description, year } = budget1;

    const expectResult: Budget = {
      id: expect.any(String),
      name,
      description,
      year,
    };

    const actualResult = service.createBudget(budget1);

    expect(actualResult).toEqual(expectResult);
  });
});
