import { options } from './auth/config/jwt-options-async-registor';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import * as redisStore from "cache-manager-redis-store"
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppGateway } from './app/app.gateway';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';


@Module({
  imports: [AuthModule, UserModule, PrismaModule, ConfigModule.forRoot({isGlobal:true}), ServeStaticModule.forRoot({
    rootPath: join(__dirname, "..", "upload")
  }), CacheModule.register({
    isGlobal: true,
    store: redisStore,
    host: "localhost",
    port: "6379"
  })],
  providers: [AppGateway]
})
export class AppModule {}
