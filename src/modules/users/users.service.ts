import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import {Role} from "./entities/role.entity";
import bcrypt from "bcrypt";
import {UserRole} from "./enums/user-roles.enum";
import {PasswordDoNotMatchError} from "./errors/error";
import {AuthDto} from "./dto/auth.dto";


@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>,
              @InjectRepository(Role) private roleRepository: Repository<Role>) {
  }

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.password !== createUserDto.repeatPassword) {
      throw new PasswordDoNotMatchError();
    }

    let user = await this.userRepository.findOneBy({
      email: createUserDto.email
    })

    if (user) {
      throw new Error("User already exists");
    }

    let hashedPassword: string  = await bcrypt.hashSync(createUserDto.password, 10);

    let userRole = await this.roleRepository.findOneBy({
      id: UserRole.USER
    })

    if (!userRole) {
      throw new Error("Roles does not exist");
    }

    return this.userRepository.save({
      name: createUserDto.name,
      surname: createUserDto.surname,
      password: hashedPassword,
      email: createUserDto.email,
      roles: [userRole]
    });
  }

  async auth(authDto: AuthDto) {
    let user = await this.userRepository.findOneBy({email: authDto.email})
    if (!user) {
      throw new Error("Invalid email or password");
    }

    let passwordIsMatched = bcrypt.compare(authDto.password, user.password);
    if (!passwordIsMatched) {
      throw new Error("Invalid email or password");
    }

    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number): Promise<User | null> {
   return this.userRepository.findOneBy({id})
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
