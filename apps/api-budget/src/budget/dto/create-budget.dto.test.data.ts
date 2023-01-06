import { CreateBudgetDto } from './create-budget.dto';

const createBudgetDto: CreateBudgetDto = new CreateBudgetDto();

createBudgetDto.description = 'This is a budget for 2000';
createBudgetDto.name = 'This is the 2000 year budget';
createBudgetDto.year = 2000;

export { createBudgetDto };
