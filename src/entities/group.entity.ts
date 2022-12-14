import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './';

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => User, (user) => user.group, { eager: true })
  users: User[];

  @Column({ name: 'value', type: 'int', nullable: false })
  value: number;

  @Column({ name: 'end_date', type: 'varchar', nullable: true })
  endDate: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
