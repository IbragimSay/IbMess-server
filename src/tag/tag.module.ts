import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { STRATEGY } from 'src/auth/strategy';
import { GUARD } from 'src/auth/guard';
import { UserService } from 'src/user/user.service';

@Module({
  providers: [TagService, PrismaService, ...STRATEGY, ...GUARD, UserService],
  controllers: [TagController]
})
export class TagModule {}
