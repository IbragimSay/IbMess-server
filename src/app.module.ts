import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  imports: [AuthModule, UserModule, PrismaModule, ConfigModule.forRoot({isGlobal:true}), ServeStaticModule.forRoot({
    rootPath: join(__dirname, "..", "upload")
  })]
})
export class AppModule {}
