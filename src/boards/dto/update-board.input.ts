import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateBoardInput {
    @Field()
    id!: number;

    @Field()
    title!: string;

    @Field()
    context!: string;
}