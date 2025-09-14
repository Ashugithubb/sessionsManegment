import { Module } from '@nestjs/common';
import { SessionTableService } from './session-table.service';
import { SessionTableController } from './session-table.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionTable } from './entities/session-table.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([SessionTable]),UserModule],
  controllers: [SessionTableController],
  providers: [SessionTableService],
  exports:[SessionTableService]
})
export class SessionTableModule {}
