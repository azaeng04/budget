import {
  IsDefined,
  IsInt,
  IsNotEmpty,
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
  private _name: string;

  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }

  @IsNotEmpty()
  @IsDefined()
  @MinLength(10)
  @MaxLength(250)
  private _description: string;

  public get description(): string {
    return this._description;
  }
  public set description(value: string) {
    this._description = value;
  }

  @IsNotEmpty()
  @IsDefined()
  @IsInt()
  @Min(1000)
  @Max(9999)
  private _year: number;

  public get year(): number {
    return this._year;
  }
  public set year(value: number) {
    this._year = value;
  }
}
