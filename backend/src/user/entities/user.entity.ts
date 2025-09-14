
import { SessionTable } from 'src/session-table/entities/session-table.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({unique:true})
  email: string;


  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => SessionTable, (s) => s.user)
  sessions: SessionTable
}
