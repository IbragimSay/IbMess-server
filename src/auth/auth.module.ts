import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { options } from './config';
import { UserModule } from 'src/user/user.module';
import { STRATEGY } from './strategy';
import { GUARD } from './guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UserService, ...STRATEGY, ...GUARD],
  imports: [PassportModule, JwtModule.registerAsync(options())]
})
export class AuthModule {}
