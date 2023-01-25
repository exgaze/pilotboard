import { UsersModule } from './../users/users.module';
import { Board } from 'src/boards/board.entity';
import { BoardsModule } from './../boards/boards.module';
import { Comment } from './comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CommentsResolver } from './comments.resolver';
import { CommentsService } from './comments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, Board]),
    BoardsModule,
    UsersModule,
  ],
  providers: [CommentsResolver, CommentsService]
})
export class CommentsModule {}
