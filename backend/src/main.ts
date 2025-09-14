import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import session, { MemoryStore, Store } from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import process from 'process';
import { IoAdapter } from '@nestjs/platform-socket.io';

import { INestApplicationContext } from '@nestjs/common';
import { RequestHandler } from 'express';
import { sessionMiddleware } from './config/session.config';

export class SessionIoAdapter extends IoAdapter {
  constructor(private app: INestApplicationContext, private sessionMiddleware) {
    super(app);
  }
  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, options);
    server.use((socket, next) => {
      this.sessionMiddleware(socket.request, {}, next);
    });
    return server;
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    sessionMiddleware
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.useWebSocketAdapter(new SessionIoAdapter(app, sessionMiddleware));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.enableCors({
    origin: [process.env.CLIENT_URL ?? "http://localhost:3000"],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3001);
  app.useGlobalPipes(new ValidationPipe());

}
bootstrap().then(() => { });








// const ioAdapter = app.getHttpAdapter().getInstance().get('io');
  // if (ioAdapter) {
  //   ioAdapter.use((socket, next) => {
  //     sessionMiddleware(socket.request, {} as any, next);
  //   });
  // }