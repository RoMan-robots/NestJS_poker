import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";

@Entity("wallet")
export class Wallet {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User, (user) => user.wallet)
    @JoinColumn()
    user: User;

    @Column()
    units: number;

    @Column()
    cents: number;
}
