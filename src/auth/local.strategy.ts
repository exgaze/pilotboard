import { AuthService } from './auth.service';
import { Strategy } from 'passport-local'
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class LocalStratgy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService) {
        super({
            usernameField: 'email',
            password: 'password'
        });        
    }

    async validate(nickname: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(nickname, password);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}