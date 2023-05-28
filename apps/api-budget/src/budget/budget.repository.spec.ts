import { TestingModule, Test } from '@nestjs/testing';
import { BudgetRepositoryAdapterService } from './budget.adapter.service';
import { Budget } from './budget.entity';
import { BudgetRepository } from './budget.repository';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { Spy, provideAutoSpy } from 'jest-auto-spies';
import { GetBudgetsFilterDto } from './dto/get-budgets-filter.dto';
import { SelectQueryBuilder } from 'typeorm';

describe(`BudgetRepository`, () => {
  let budgetRepository: BudgetRepository;
  let budgetRepositoryAdapterServiceSpy: Spy<BudgetRepositoryAdapterService>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BudgetRepository,
        provideAutoSpy(BudgetRepositoryAdapterService),
      ],
    }).compile();

    budgetRepository = module.get(BudgetRepository);
    budgetRepositoryAdapterServiceSpy = module.get(
      BudgetRepositoryAdapterService,
    );
  });

  test('should create a budget', async () => {
    const expected: Budget = {
      id: expect.any(String),
      name: '2023 Budget',
      description: 'This is the 2023 budget',
      year: 2023,
    };

    const expectedArgs: CreateBudgetDto = {
      name: '2023 Budget',
      description: 'This is the 2023 budget',
      year: 2023,
    };

    const mockData: Budget = {
      id: '1',
      ...expectedArgs,
    };

    budgetRepositoryAdapterServiceSpy.save.mockReturnValueOnce(mockData);

    const actual = await budgetRepository.create(expectedArgs);

    expect(actual).toEqual(expected);
    expect(budgetRepositoryAdapterServiceSpy.save).toHaveBeenCalledTimes(1);
    expect(budgetRepositoryAdapterServiceSpy.save).toHaveBeenCalledWith(
      expectedArgs,
    );
  });

  test('should get budget by ID', async () => {
    const expected: Budget = {
      id: '1',
      description: 'This is the 2023 budget',
      name: '2023 Budget',
      year: 2023,
    };

    const mockData: Budget = {
      id: '1',
      description: 'This is the 2023 budget',
      name: '2023 Budget',
      year: 2023,
    };

    const expectedArgs = {
      where: {
        id: '1',
      },
    };
    const id = '1';

    budgetRepositoryAdapterServiceSpy.findOne.mockResolvedValueOnce(mockData);

    const actual = await budgetRepository.findById(id);

    expect(actual).toEqual(expected);
    expect(budgetRepositoryAdapterServiceSpy.findOne).toHaveBeenCalledTimes(1);
    expect(budgetRepositoryAdapterServiceSpy.findOne).toHaveBeenCalledWith(
      expectedArgs,
    );
  });

  test('should get all budgets', async () => {
    const expectedResult: Budget[] = [
      {
        id: '1',
        description: 'This is the 2023 budget',
        name: '2023 Budget',
        year: 2023,
      },
      {
        id: '2',
        description: 'This is the 2024 budget',
        name: '2024 Budget',
        year: 2024,
      },
    ];

    const mockData: Budget[] = [
      {
        id: '1',
        description: 'This is the 2023 budget',
        name: '2023 Budget',
        year: 2023,
      },
      {
        id: '2',
        description: 'This is the 2024 budget',
        name: '2024 Budget',
        year: 2024,
      },
    ];

    budgetRepositoryAdapterServiceSpy.find.mockReturnValue(mockData);

    const actualResult = await budgetRepository.findAll();

    expect(actualResult).toEqual(expectedResult);
    expect(budgetRepositoryAdapterServiceSpy.find).toHaveBeenCalledWith();
  });

  test('should get all budgets by search criteria', async () => {
    const expectedResult: Budget[] = [
      {
        id: '2',
        description: 'This is the 2024 budget',
        name: '2024 Budget',
        year: 2024,
      },
    ];

    const mockData: Budget[] = [
      {
        id: '2',
        description: 'This is the 2024 budget',
        name: '2024 Budget',
        year: 2024,
      },
    ];

    const filterDto: GetBudgetsFilterDto = {
      search: '2024',
    };

    const selectQb1 = {
      orWhere: jest.fn().mockReturnValue({
        orWhere: jest.fn().mockReturnValue({ orWhere: jest.fn() }),
      }),
    };

    const selectQb = {
      where: jest.fn().mockReturnValue(jest.fn()),
      getMany: jest.fn().mockReturnValue(mockData),
    };

    budgetRepositoryAdapterServiceSpy.find.mockReturnValue(mockData);
    const mockFuncs =
      budgetRepositoryAdapterServiceSpy.createQueryBuilder.mockReturnValue(
        selectQb,
      );

    const actualResult = await budgetRepository.findAll(filterDto);

    expect(actualResult).toEqual(expectedResult);
    expect(mockFuncs.getMockImplementation()().getMany).toHaveBeenCalledTimes(
      1,
    );
    expect(
      budgetRepositoryAdapterServiceSpy.createQueryBuilder,
    ).toHaveBeenCalledWith('budget');
    expect(mockFuncs.getMockImplementation()().where).toHaveBeenCalledWith(
      '(budget.id LIKE LOWER(:search) OR LOWER(budget.name) LIKE LOWER(:search) OR LOWER(budget.description) LIKE LOWER(:search) OR budget.year LIKE LOWER(:search))',
      { search: '%2024%' },
    );
  });
});
