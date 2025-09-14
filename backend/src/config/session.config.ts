import session, { MemoryStore, Store } from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import process from 'process';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { INestApplicationContext } from '@nestjs/common';
import { RequestHandler } from 'express';
import * as dotenv from "dotenv";
dotenv.config();
const memoryStore = new MemoryStore();
  export const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET as any,
    resave: Boolean(process.env.SESSION_RESAVE),
    saveUninitialized: Boolean(process.env.SESSION_SAVE_UNINITIALIZED),
  store: memoryStore,
    cookie: {
      maxAge: 3600000,
      secure: false,
      httpOnly: false,
      path: "/",
      sameSite: "lax",
    },
  }) as RequestHandler & { store: Store };


export const sessionStore = memoryStore;