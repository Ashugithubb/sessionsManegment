import {
  Controller,
  Get,
  Ip,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { Request } from 'express';
import { LocalGuard } from './guard/local.guard';
import { AuthenticatedGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('logout')
  logout(@Req() request): Promise<any> {
    return this.authService.logout(request);
  }

  @UseGuards(LocalGuard)
  @Post('login')
  login(@Req() req, @Ip() clientIp: string,@Res() res) {
    if (req.session) {
      req.session.deviceInfo = {
        userAgent: req.headers['user-agent'],
        ipAddress: req.ip,
        timeStamp: new Date()
      };
    }
    return this.authService.login(req,res);
  }
}

















//  Session {
//   cookie: {
//     path: '/',
//     _expires: null,
//     originalMaxAge: null,
//     httpOnly: true,
//     maxAg: 36000,
//     secure: false
//   },
//   passport: { user: { id: 1, email: 'itsray650@gmail.com', name: 'Ashutosh' } },
//   deviceInfo: {
//     userAgent: 'PostmanRuntime/7.45.0',
//     ipAddress: '::1',
//     timeStamp: 2025-08-28T05:26:11.015Z
//   }
// }

// console.log("ip address", clientIp)
// console.log("device:", req.headers['user-agent'],)
//    const currentTime = new Date();
//    console.log("current Time",currentTime);
// currentTime.setHours(currentTime.getHours() + 1);
// console.log("eXPIRY Time",currentTime);
// console.log("expiry",req.session.cookie.expires)
// req.session.cookie.expires=currentTime;