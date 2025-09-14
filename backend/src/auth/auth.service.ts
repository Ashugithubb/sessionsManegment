
import { HttpException, HttpStatus, Inject, Injectable, Req, Res, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import session from "express-session";
import { session as passportSession } from "passport";
import { Socket } from 'socket.io';
import { sessionStore } from 'src/config/session.config';
import { WebsocketsGateway } from 'src/gateway/websockets.gateway';
import { SessionTableService } from 'src/session-table/session-table.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService,
    private readonly sessionService: SessionTableService,
    private readonly webSocketsService: WebsocketsGateway,

  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) throw new UnauthorizedException("User email not found");

    const passwordMatch: boolean = await this.passworMatch(
      password,
      user.password,
    );
    if (!passwordMatch)
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);

    return {
      id: user.id,
      email: user.email,
      name: user.firstName,

    };
  }

  async passworMatch(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }


  generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }



  waitForOtp(sessionId: string, timeoutMs = 60000): Promise<string | null> {
    return new Promise((resolve) => {
      const interval = 1000;
      let elapsed = 0;

      const timer = setInterval(() => {

        (sessionStore as any).all((err: any, sessions: Record<string, any>) => {
          if (err) {
            console.error("Error fetching sessions:", err);
            clearInterval(timer);
            resolve(null);
            return;
          }

          const session = sessions[sessionId];
          if (session && session.otp) {
            clearInterval(timer);
            resolve(session.otp);
          }
        });
        elapsed += interval;
        if (elapsed >= timeoutMs) {
          clearInterval(timer);
          resolve(null);
        }
      }, interval);
    });
  }

  async login(@Req() request, @Res() res): Promise<any> {
    const device = request.session.deviceInfo.userAgent;
    const IpAddress = request.session.deviceInfo.ipAddress;
    const loginTime = request.session.deviceInfo!.timeStamp;
    const userId = request.session.passport.user.id
    const sessionId = request.sessionID;

    const prevSession = await this.sessionService.NumberOfDeviceLogedIn(userId);

    if (prevSession[1] === 1) {
      const otp = this.generateOtp();
      const existingSession = prevSession[0].map((m) => m.sessionId);

      this.webSocketsService.server.emit("secondSession", {
        otp,
        sessionId: existingSession[0]
      }
      );

      const receivedOtp = await this.waitForOtp(existingSession[0]);


      if (otp === receivedOtp) {
        await this.sessionService.create({ device, IpAddress, loginTime, userId, sessionId })
        return res.status(HttpStatus.OK).json({
          message: 'Login successful',
          statusCode: HttpStatus.OK,
        });
      }
      else {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message: 'Time Out or Wrong Otp',
        });
      }
    }
    await this.sessionService.create({ device, IpAddress, loginTime, userId, sessionId })
    return res.status(HttpStatus.OK).json({
      message: 'Login successful',
      statusCode: HttpStatus.OK,
    });
  }

  async logout(@Req() request): Promise<any> {
    const device = request.headers['user-agent'];
    const updated = await this.sessionService.updateSession(device);
    request.session.destroy(() => {
      return {
        message: 'Logout successful',
        statusCode: HttpStatus.OK,
      };
    });
  }
}



