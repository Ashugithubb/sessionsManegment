import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("sessions_logs")
export class SessionTable {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    sessionId:string

    @Column()
    device: string

    @Column()
    IpAddress: string

    @Column()
    loginTime: Date


    @Column()
    isActive: boolean

    @CreateDateColumn()
    createdAt: Date

    @DeleteDateColumn()
    deletedAt: Date

    @ManyToOne(() => User, (u) => u.sessions)
    user: User


}
