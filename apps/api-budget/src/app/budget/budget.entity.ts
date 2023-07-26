import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Budget {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  description?: string;

  @Column()
  year!: number;
}
