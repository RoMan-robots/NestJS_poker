import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import {InjectRepository} from "@nestjs/typeorm";

@Module({
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {


}
