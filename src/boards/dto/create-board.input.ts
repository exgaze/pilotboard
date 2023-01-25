import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateBoardInput {
    @Field()
    title!: string;

    @Field()
    context!: string;
}