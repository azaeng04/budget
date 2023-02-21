import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Budget {
  public constructor(id: string, name: string, year: number) {
    this.id = id;
    this.name = name;
    this.year = year;
  }

  @PrimaryGeneratedColumn('uuid')
  private _id: string;

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  @Column()
  private _name: string;

  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }

  @Column()
  private _description: string;

  public get description(): string {
    return this._description;
  }
  public set description(value: string) {
    this._description = value;
  }

  @Column()
  private _year: number;

  public get year(): number {
    return this._year;
  }
  public set year(value: number) {
    this._year = value;
  }
}
