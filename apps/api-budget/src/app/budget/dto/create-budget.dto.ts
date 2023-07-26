import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateBudgetDto {
  @IsNotEmpty()
  @IsDefined()
  @MinLength(5)
  @MaxLength(30)
  name!: string;

  @IsOptional()
  @IsNotEmpty()
  @IsDefined()
  @MaxLength(250)
  description!: string;

  @IsNotEmpty()
  @IsDefined()
  @IsInt()
  @Min(1000)
  @Max(9999)
  year!: number;
}
