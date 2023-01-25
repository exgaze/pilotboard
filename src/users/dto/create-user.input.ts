import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, Max } from "class-validator";

@InputType()
export class CreateUserInput {
    @IsEmail()
    @Field()
    email!: string;

    @Field()
    password!: string;

    @Max(10)
    @Field()
    nickname!: string;

    @Max(50)
    @Field({nullable: true})
    description?: string;
}