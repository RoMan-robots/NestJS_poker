import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {UsersController} from './users.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Role} from "./entities/role.entity";
import {Room, User} from "./entities/user.entity";
import {Wallet} from "./entities/wallet.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Wallet, User, Role, Room])],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {
}
