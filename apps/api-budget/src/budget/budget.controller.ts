import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@Controller('budget')
export class BudgetController {
  constructor(private budgetService: BudgetService) {}

  @Post()
  createBudget(@Body() budgetDto: CreateBudgetDto) {
    return this.budgetService.createBudget(budgetDto);
  }

  @Get()
  getAllBudgets() {
    return this.budgetService.getAllBudgets();
  }

  @Get(':id')
  getBudgetByID(@Param('id') id: string) {
    return this.budgetService.findBudgetById(id);
  }

  @Patch(':id')
  updateBudget(
    @Param('id') id: string,
    @Body() updateBudgetDto: UpdateBudgetDto,
  ) {
    return this.budgetService.updateBudgetById(id, updateBudgetDto);
  }

  @Delete(':id')
  deleteBudgetById(@Param('id') id: string) {
    return this.budgetService.deleteBudgetById(id);
  }
}
