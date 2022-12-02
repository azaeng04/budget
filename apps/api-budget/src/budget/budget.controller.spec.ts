import { Test, TestingModule } from '@nestjs/testing';
import { BudgetController } from './budget.controller';
import { Budget } from './budget.model';
import { CreateBudgetDto } from './dto/budget.dto';

describe('BudgetController', () => {
  let controller: BudgetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BudgetController],
    }).compile();

    controller = module.get<BudgetController>(BudgetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should add a budget', async () => {
    const expected: Budget = {
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
});
