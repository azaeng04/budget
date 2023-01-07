import { UpdateBudgetDto } from './update-budget.dto';

const updateBudgetDto: UpdateBudgetDto = new UpdateBudgetDto();

updateBudgetDto.description = 'This is a budget for 2000';
updateBudgetDto.name = 'This is the 2000 year budget';
updateBudgetDto.year = 2000;

export { updateBudgetDto };
