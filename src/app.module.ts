import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ImageModule } from './image/image.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ArticleModule } from './article/article.module';
import { TagModule } from './tag/tag.module';


@Module({
  imports: [AuthModule, UserModule, PostModule, PrismaModule, ConfigModule.forRoot({isGlobal:true}), ImageModule, ServeStaticModule.forRoot({
    rootPath: join(__dirname, "..", "upload")
  }), ArticleModule, TagModule,]
})
export class AppModule {}
