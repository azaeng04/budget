import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Budget {
  public constructor(id: string, name: string, year: number) {
    this.id = id;
    this.name = name;
    this.year = year;
  }

  @PrimaryGeneratedColumn('uuid')
  private id: string;

  public get _id(): string {
    return this.id;
  }
  public set _id(value: string) {
    this.id = value;
  }

  @Column()
  private name: string;

  public get _name(): string {
    return this.name;
  }
  public set _name(value: string) {
    this.name = value;
  }

  @Column()
  private description: string;

  public get _description(): string {
    return this.description;
  }
  public set _description(value: string) {
    this.description = value;
  }

  @Column()
  private year: number;

  public get _year(): number {
    return this.year;
  }
  public set _year(value: number) {
    this.year = value;
  }
}
