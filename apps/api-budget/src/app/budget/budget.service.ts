import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { Budget } from './budget.entity';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BudgetService {
  budgets: Budget[] = [];

  constructor(
    @InjectRepository(Budget) private budgetRepo: Repository<Budget>
  ) {}

  async getAllBudgets() {
    return this.budgetRepo.find();
  }

  async findBudgetById(id: string) {
    const budgetFound = await this.budgetRepo.findOne({ where: { id } });
    if (!budgetFound)
      throw new NotFoundException(`The budget with ID: ${id} cannot be found`);
    return budgetFound;
  }

  async createBudget(budgetDto: CreateBudgetDto) {
    return this.budgetRepo.save(budgetDto);
  }

  async updateBudgetById(id: string, updateBudgetDto: UpdateBudgetDto) {
    const budgetToUpdate = await this.findBudgetById(id);
    const newBudget = { ...budgetToUpdate, ...updateBudgetDto };
    await this.budgetRepo.save(newBudget);
    return budgetToUpdate;
  }

  async deleteBudgetById(id: string) {
    await this.findBudgetById(id);
    await this.budgetRepo.delete(id);
  }
}
