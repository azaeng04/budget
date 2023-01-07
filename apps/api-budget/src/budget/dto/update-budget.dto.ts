import {
  IsNotEmpty,
  IsDefined,
  MinLength,
  MaxLength,
  IsInt,
  Min,
  Max,
} from 'class-validator';

export class UpdateBudgetDto {
  @IsNotEmpty()
  @IsDefined()
  @MinLength(5)
  @MaxLength(30)
  name: string;

  @IsNotEmpty()
  @IsDefined()
  @MaxLength(250)
  description: string;

  @IsNotEmpty()
  @IsDefined()
  @IsInt()
  @Min(1000)
  @Max(9999)
  year: number;
}
