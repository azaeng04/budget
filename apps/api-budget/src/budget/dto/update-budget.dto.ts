import {
  IsNotEmpty,
  IsDefined,
  MinLength,
  MaxLength,
  IsInt,
  Min,
} from 'class-validator';

export class UpdateBudgetDto {
  @IsNotEmpty()
  @IsDefined()
  @MinLength(5)
  @MaxLength(30)
  name: string;

  @IsNotEmpty()
  @IsDefined()
  @MinLength(10)
  @MaxLength(250)
  description: string;

  @IsNotEmpty()
  @IsDefined()
  @IsInt()
  @Min(1900)
  year: number;
}
