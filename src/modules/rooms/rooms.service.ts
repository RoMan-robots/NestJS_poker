import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {CreateRoomDto} from './dto/create-room.dto';
import {UpdateRoomDto} from './dto/update-room.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Room} from "./entities/room.entity";
import {Repository} from "typeorm";
import {UsersService} from "../users/users.service";
import {User} from "../users/entities/user.entity";

@Injectable()
export class RoomsService {
    constructor(@InjectRepository(Room) private readonly roomRepository: Repository<Room>,
                @Inject(UsersService) private readonly usersService: UsersService) {
    }

    async create(roomDto: CreateRoomDto): Promise<Room> {
        let user = await this.usersService.findOne(roomDto.userId);
        if (!user) {
            throw new NotFoundException("User does not exist");
        }

        return this.roomRepository.save({
                name: roomDto.name,
                minBlind: roomDto.minBlind,
                users: [user]
            }
        );
    }


    async update(updateDto: UpdateRoomDto) {
        let room = await this.roomRepository.findOneBy({id: updateDto.userId})
        if (!room) {
            throw new NotFoundException("Room does not exist");
        }

        room.name = updateDto.name ? updateDto.name : room.name;
        room.isActive = updateDto.isActive ? updateDto.isActive : room.isActive;
        room.minBlind = updateDto.minBlind ? updateDto.minBlind : room.minBlind;

        return this.roomRepository.save(room);
    }
}
