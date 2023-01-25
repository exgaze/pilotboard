import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateCommentInput {
    @Field()
    id!: number;

    @Field()
    content!: string;
}