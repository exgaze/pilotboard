import { BoardsService } from './../boards/boards.service';
import { create } from 'domain';
import { Context } from '@nestjs/graphql';
import { Board } from 'src/boards/board.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { Comment } from './comment.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { UpdateCommentInput } from './dto/update-comment.input';

@Injectable()
export class CommentsService {
    constructor(@InjectRepository(Comment) private commentRepository: Repository<Comment>,
    ) {}


    async createComment(createComment): Promise<Comment> {
        const args = {
            content: createComment.content,
            depth: createComment.depth,
            user: createComment.user,
            boards: createComment.boards,
            boardId: createComment.boardId,
        };

        if (createComment.parentComment) {
            args['parentComment'] = createComment.parentComment;
        }

        const newComment = await this.commentRepository.create(args);
        
        return this.commentRepository.save(newComment);
    }

    async getComments(boardId) {
        return this.commentRepository.find({
            where: {
                boardId: boardId,
                depth: 0,
            },
            relations: ["childComments"],
            order: {id: "ASC"},
        })
    }

    getCommentById(id) {
        return this.commentRepository.findOneBy({id: id});
    }

    updateComment(updateCommentInput: UpdateCommentInput, comment: Comment): Promise<Comment> {
        comment.content = updateCommentInput.content;
        return this.commentRepository.save(comment);
    }

    async deleteComment(id: number) {
        const result = await this.commentRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException('Board Not Fount');
        }
        return "Delete Success"; 
    }
}
