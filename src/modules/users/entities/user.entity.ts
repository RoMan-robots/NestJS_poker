import {Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Role} from "./role.entity";
import {Wallet} from "./wallet.entity";
import {Room} from "../../rooms/entities/room.entity";


@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    surname: string;

    @Column()
    name: string;

    @ManyToMany(() => Role, (role) => role.users)
    @JoinTable()
    roles: Role[];

    @OneToOne(() => Wallet, (wallet) => wallet.user)
    wallet: Wallet;

    @ManyToMany(() => Room, (room) => room.users)
    rooms: Room[];
}
