import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { GUARD } from 'src/auth/guard';
import { STRATEGY } from 'src/auth/strategy';
import { PostService } from 'src/post/post.service';
import { TagService } from 'src/tag/tag.service';

@Module({
  providers: [ArticleService, UserService, PrismaService, ...GUARD, ...STRATEGY, PostService, TagService],
  controllers: [ArticleController]
})
export class ArticleModule {}
