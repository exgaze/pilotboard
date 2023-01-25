import { Comment } from './comments/comment.entity';
import { Board } from 'src/boards/board.entity';
import { User } from 'src/users/user.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BoardsModule } from './boards/boards.module';
import { CommentsModule } from './comments/comments.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeORMConfig } from 'configs';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema/gql'),

    }),
    TypeOrmModule.forRoot(typeORMConfig),
    UsersModule, AuthModule, BoardsModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
