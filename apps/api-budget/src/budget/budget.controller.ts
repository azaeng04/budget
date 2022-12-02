import { Body, Controller, Post } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateBudgetDto } from './dto/budget.dto';

@Controller('budget')
export class BudgetController {
  @Post('create')
  createBudget(@Body() budgetDto: CreateBudgetDto) {
    const { name, description, year } = budgetDto;

    return {
      id: randomUUID(),
      name,
      description,
      year,
    };
  }
}
