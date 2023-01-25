import { UsersService } from 'src/users/users.service';
import { DeleteResult } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Board } from 'src/boards/board.entity';
import { CreateBoardInput } from './dto/create-board.input';
import { BoardsService } from './boards.service';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/jwt-authguard';
import { UseGuards } from '@nestjs/common';
import { SearchOptions } from './dto/options-board';
import { ExtractUser } from 'src/auth/userextractor';
import { UpdateBoardInput } from './dto/update-board.input';

@Resolver()
export class BoardsResolver {
    constructor(private boardService: BoardsService,
        private usersService: UsersService) {}

    @Mutation(() => Board)
    @UseGuards(JwtAuthGuard)
    async createBoard(@Args('createBoardInput') createBoardInput: CreateBoardInput, @ExtractUser() userId: User): Promise<Board> {
        const user = await this.usersService.findById(userId.id);
        return await this.boardService.createBoard(createBoardInput, user);
    }

    @Query(() => [Board])
    async getBoards(@Args('sort') sort: string, @Args('searchOption') searchOption?: SearchOptions): Promise<Board[]> {
        if (searchOption) {
            return await this.boardService.getBoards(sort, searchOption);
        }
        return await this.boardService.getBoards(sort);
    }

    @Query(() => Board)
    async getBoard(@Args('boardId') boardId: number): Promise<Board> {
        return await this.boardService.getBoard(boardId);
    }

    @Mutation(() => Board)
    @UseGuards(JwtAuthGuard)
    async updateBoard(@Args('updateBoardInput') updateBoardInput: UpdateBoardInput) {
        const board = await this.boardService.getBoard(updateBoardInput.id);
        return this.boardService.updateBoard(updateBoardInput, board);
    }

    @Mutation(() => String)
    @UseGuards(JwtAuthGuard)
    async deleteBoard(@Args('boardId')boardId: number): Promise<String> {
        return await this.boardService.deleteBoard(boardId);
    }
}
