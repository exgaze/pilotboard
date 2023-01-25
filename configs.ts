import { User } from 'src/users/user.entity';
import { Board } from 'src/boards/board.entity';
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Comment } from "src/comments/comment.entity";

export const typeORMConfig: TypeOrmModuleOptions = {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'passwords',
        database: 'pilotboard',
        entities: [
          //"dist/**/*.entity.{ts,.js}"
          User,
          Board,
          Comment,
        ],
        synchronize: false,
      
}

export const JSK = "SECRET";