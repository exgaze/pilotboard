import { User } from 'src/users/user.entity';
import { CreateUserInput } from './../users/dto/create-user.input';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findUser(email);
        const valid = await bcrypt.compare(password, user.password);

        if (user && valid) {
            const {password, ...result} = user;
            return result;
        }

        throw new Error("Check Password");
    }

    async signUp(createUserInput: CreateUserInput) {
        const chkuser = await this.usersService.findUser(createUserInput.email);

        if (chkuser) {
            throw new Error("User Exists");
        }

        const password = await bcrypt.hash(createUserInput.password, 10);

        const newuser = await this.usersService.createUser({
            ...createUserInput,
            password
        });

        return {access_token: this.jwtService.sign({userId: newuser.id})};
    }

    async login(user: User) {
        return {access_token: this.jwtService.sign({userId: user.id})};
    }
}
