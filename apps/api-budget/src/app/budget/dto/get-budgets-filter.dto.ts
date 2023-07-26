import { MaxLength } from 'class-validator';

export class GetBudgetsFilterDto {
  @MaxLength(250)
  search!: string;
}
