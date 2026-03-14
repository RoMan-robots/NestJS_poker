import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("wallet")
export class Wallet {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => User, required: false })
  @OneToOne(() => User, (user) => user.wallet)
  @JoinColumn()
  user: User;

  @ApiProperty({ example: 100 })
  @Column()
  units: number;

  @ApiProperty({ example: 50 })
  @Column()
  cents: number;
}
