import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { SessionTableModule } from './session-table/session-table.module';
import { OtpModule } from './otp/otp.module';
import { WebsocketsGatewayModule } from './gateway/websockets.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
  TypeOrmModule.forRootAsync(typeOrmConfig),
    UserModule, AuthModule, SessionTableModule,
    OtpModule, WebsocketsGatewayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
