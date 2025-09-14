import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSessionTableDto } from './dto/create-session-table.dto';
import { UpdateSessionTableDto } from './dto/update-session-table.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionTable } from './entities/session-table.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SessionTableService {
  constructor(@InjectRepository(SessionTable) private readonly sessionRepo: Repository<SessionTable>,
    private readonly userService: UserService) { }

  async create(createSessionTableDto: CreateSessionTableDto) {

    const { userId } = createSessionTableDto;
    const user = await this.userService.findOneById(userId);
    if (!user) throw new NotFoundException()
    const newSession = this.sessionRepo.create({
      ...createSessionTableDto,
      isActive: true,
      user,
    })

    const count = await this.NumberOfDeviceLogedIn(userId);
    if (count[1] == 2) throw new ConflictException("Your Are Already logedIn to 2 Devices");
    return await this.sessionRepo.save(newSession);
  }

  async NumberOfDeviceLogedIn(userId: number) {
    const qb = this.sessionRepo
      .createQueryBuilder('session')
    qb.andWhere("session.userId = :userId", { userId });
    qb.andWhere("session.isActive = :bool", { bool: true });
    return await qb.getManyAndCount()
  }


  async findAllMyLogs(userId: number) {
    return await this.sessionRepo.find({
      where: {
        user: { id: userId },
      }
    })
  }

  async updateSession(device: string) {
    const session = await this.sessionRepo.findOne({
      where: { device, isActive: true }
    })
    if (!session) throw new NotFoundException("session Not found");
    session.isActive = false;
    await this.sessionRepo.save(session);
  }




  findOne(id: number) {
    return `This action returns a #${id} sessionTable`;
  }



  remove(id: number) {
    return `This action removes a #${id} sessionTable`;
  }
}
