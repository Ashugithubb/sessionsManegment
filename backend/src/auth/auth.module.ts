import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { Session } from './session';

import { UserModule } from 'src/user/user.module';
import { SessionTable } from 'src/session-table/entities/session-table.entity';
import { SessionTableModule } from 'src/session-table/session-table.module';
import { WebsocketsGatewayModule } from 'src/gateway/websockets.module';

@Module({
  imports: [
    UserModule, PassportModule.register({ session: true }), SessionTableModule,
    forwardRef(() => WebsocketsGatewayModule)],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, Session,],
  exports: [AuthService]
})
export class AuthModule { }