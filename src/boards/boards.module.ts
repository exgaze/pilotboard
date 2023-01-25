import { UsersModule } from './../users/users.module';
import { Board } from 'src/boards/board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BoardsResolver } from './boards.resolver';
import { BoardsService } from './boards.service';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), UsersModule],
  providers: [BoardsResolver, BoardsService],
  exports: [BoardsService]
})
export class BoardsModule {}
