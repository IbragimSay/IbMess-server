import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { GUARD } from 'src/auth/guard';
import { STRATEGY } from 'src/auth/strategy';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { PostService } from 'src/post/post.service';
import { ArticleService } from 'src/article/article.service';
import { TagService } from 'src/tag/tag.service';

@Module({
  controllers: [ImageController],
  providers: [ImageService, PrismaService, ...GUARD, ...STRATEGY, UserService, ConfigService, ArticleService, PostService, TagService]
})
export class ImageModule {}
