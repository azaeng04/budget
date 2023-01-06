import { MaxLength } from 'class-validator';

export class GetBudgetsFilterDto {
  @MaxLength(250)
  private _search: string;

  public get search(): string {
    return this._search;
  }
  public set search(value: string) {
    this._search = value;
  }
}
