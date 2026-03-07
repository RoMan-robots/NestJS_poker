import {Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Role} from "./role.entity";
import {Wallet} from "./wallet.entity";


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


@Entity("rooms")
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column()
    minBlind: number;

    @Column()
    isActive: boolean;

    @ManyToMany(() => User, (user) => user.rooms)
    @JoinTable()
    users: User[];
}
