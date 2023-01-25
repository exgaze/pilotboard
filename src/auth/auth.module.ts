import { JwtStrategy } from './jwt.strategy';
import { LocalStratgy } from './local.strategy';
import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JSK } from 'configs';

@Module({
  imports: [PassportModule, 
            UsersModule, 
            JwtModule.register({
              signOptions: {expiresIn: '1 day'},
              secret: JSK,
            })],
  providers: [AuthResolver, AuthService, LocalStratgy, JwtStrategy]
})
export class AuthModule {}
