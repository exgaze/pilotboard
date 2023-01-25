import { UsersService } from 'src/users/users.service';
import { BoardsService } from './../boards/boards.service';
import { User } from 'src/users/user.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { JwtAuthGuard } from './../auth/jwt-authguard';
import { UseGuards } from '@nestjs/common';
import { Comment } from './comment.entity';
import { CommentsService } from './comments.service';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ExtractUser } from 'src/auth/userextractor';
import { UpdateCommentInput } from './dto/update-comment.input';

@Resolver()
export class CommentsResolver {
    constructor(
        private commentService: CommentsService,
        private boardService: BoardsService,
        private usersService: UsersService){}

    @Mutation(() => Comment)
    @UseGuards(JwtAuthGuard)
    async createComment(@Args('CreateCommentInput')createCommentInput: CreateCommentInput, @ExtractUser() userId: User): Promise<Comment> {
        const createComment = {
            content: createCommentInput.content,
            depth: createCommentInput.depth,
            user: await this.usersService.findById(userId.id),
            boardId: createCommentInput.boardId,
            boards: await this.boardService.getBoard(createCommentInput.boardId),
        }
        
        if (createCommentInput.parentCommentId) {
            createComment['parentComment'] = await this.commentService.getCommentById(createCommentInput.parentCommentId);
        }
        return await this.commentService.createComment(createComment);
    }

    @Query(() => [Comment])
    async getComments(@Args('boardId') boardId: number): Promise<Comment[]> {
        return await this.commentService.getComments(boardId);
    }

    @Mutation(() => Comment)
    @UseGuards(JwtAuthGuard)
    async updateComment(@Args('updateCommentInput')updateCommentInput: UpdateCommentInput): Promise<Comment> {
        const comment = await this.commentService.getCommentById(updateCommentInput.id);
        return await this.commentService.updateComment(updateCommentInput, comment);
    }

    @Mutation(() => String)
    @UseGuards(JwtAuthGuard)
    async deleteComment(@Args('commentId')id: number): Promise<String> {
        return await this.commentService.deleteComment(id);
    }
}
