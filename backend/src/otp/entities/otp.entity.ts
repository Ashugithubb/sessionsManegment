import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Verification-table')
export class Otp {

    @PrimaryGeneratedColumn()
    id:number


    @Column()
    otp:string

    
}
