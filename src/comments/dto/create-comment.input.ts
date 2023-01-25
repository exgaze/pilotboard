import { Comment } from './../comment.entity';
import { Board } from 'src/boards/board.entity';
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateCommentInput {
    @Field()
    content!: string;

    @Field()
    depth!: number;

    @Field()
    boardId!: number;

    @Field({nullable: true})
    parentCommentId?: number;
}