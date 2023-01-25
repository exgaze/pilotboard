import { UpdateUserInput } from './dto/update-user.input';
import { User } from 'src/users/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { create } from 'domain';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>){}

    createUser(createUserInput: CreateUserInput): Promise<User> {
        const newUser = this.userRepository.create(createUserInput);

        return this.userRepository.save(newUser);
    }

    findUser(email: string) {
        return this.userRepository.findOneBy({email: email});
    }

    findById(id: number) {
        return this.userRepository.findOne(
            {
                where: {id: id},
                relations: ["boards", "comments"],
        },
            );
    }

    updateUser(updateUserInput: UpdateUserInput, user: User): Promise<User> {
        user.email = updateUserInput.email;
        user.password = updateUserInput.password;
        user.nickname = updateUserInput.nickname;
        if (user.description) {
            user.description = updateUserInput.description;
        }

        return this.userRepository.save(user);
    }
}
