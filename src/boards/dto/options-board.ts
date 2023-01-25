import { createParamDecorator } from '@nestjs/common';
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SearchOptions {
    @Field({nullable: true})
    title?: string;

    @Field({nullable: true})
    context?: string;


}

//export const SearchOptions = createParamDecorator(
//    {}
//)