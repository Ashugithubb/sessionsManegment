import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepo:Repository<User>){}

async create(createUserDto: CreateUserDto) {
const {email} = createUserDto;
  const existing  = await this.userRepo.findOneBy({email})
  if(existing) throw new ConflictException("User Already exist")

  createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
  return await this.userRepo.save(createUserDto);
}

  async findOneById(id:number){
    return await this.userRepo.findOneBy({id})
  }

  findAll() {
    return `This action returns all user`;
  }

async findOneByEmail(email) {
    return await this.userRepo.findOneBy({email})
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
