import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { STRATEGY } from 'src/auth/strategy';
import { GUARD } from 'src/auth/guard';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TagService } from 'src/tag/tag.service';

@Module({
  controllers: [PostController],
  providers: [PostService, ...STRATEGY, ...GUARD, UserService, PrismaService, TagService]
})
export class PostModule {}
