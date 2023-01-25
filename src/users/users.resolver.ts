import { User } from 'src/users/user.entity';
import { JwtAuthGuard } from './../auth/jwt-authguard';
import { UsersService } from 'src/users/users.service';
import { Query, Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { ExtractUser } from 'src/auth/userextractor';

@Resolver()
export class UsersResolver {
    constructor(
        private userService: UsersService,
        
    ) {}

    @Query(() => User)
    @UseGuards(JwtAuthGuard)
    async getUser(@ExtractUser() user: User){
        return await this.userService.findById(user.id);
    }

    @Mutation(() => User)
    @UseGuards(JwtAuthGuard)
    async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput, @ExtractUser() user: User) {
        return await this.userService.updateUser(updateUserInput, user);
    }
}
