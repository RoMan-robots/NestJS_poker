import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entities/user.entity";

@Entity("rooms")
export class Room {


    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column()
    minBlind: number;

    @Column({default: true})
    isActive: boolean;

    @ManyToMany(() => User, (user) => user.rooms)
    @JoinTable()
    users: User[];
}