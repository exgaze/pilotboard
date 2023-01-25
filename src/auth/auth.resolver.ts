import { CreateUserInput } from './../users/dto/create-user.input';
import { AuthService } from './auth.service';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { LoginResponse } from './dto/login-response';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';
import { LoginUserInput } from './dto/login-user.input';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) {}

    @Mutation(() => LoginResponse)
    signUp(@Args('createUserInput') createUserInput: CreateUserInput) {
        return this.authService.signUp(createUserInput);
    }

    @Query(() => LoginResponse)
    @UseGuards(GqlAuthGuard)
    login(@Args('loginUserInput') loginUserInput: LoginUserInput, @Context() context){
        return this.authService.login(context.user);
    }
}
