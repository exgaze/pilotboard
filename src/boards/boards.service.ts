import { User } from 'src/users/user.entity';
import { SearchOptions } from './dto/options-board';
import { CreateBoardInput } from './dto/create-board.input';
import { Board } from 'src/boards/board.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Like, Repository } from 'typeorm';
import { UpdateBoardInput } from './dto/update-board.input';

@Injectable()
export class BoardsService {
    constructor(@InjectRepository(Board) private boardRepository: Repository<Board>) {}
   
    createBoard(createBoardInput: CreateBoardInput, user: User): Promise<Board> {
        const {title, context} = createBoardInput;
        const newBoard = this.boardRepository.create({
            title,
            context,
            user: user
        });
        return this.boardRepository.save(newBoard);
    }

    getBoards(sort, searchOptions?: SearchOptions) {
        if (searchOptions.title) {
            return this.boardRepository.find({
                where: {title: Like(searchOptions.title)},
                order: {id: sort},
                relations: ["comments"],
            })
        }else if (searchOptions.context) {
            return this.boardRepository.find({
                where: {context: Like(searchOptions.context)},
                order: {id: sort},
                relations: ["comments"],
            })
        }
        return this.boardRepository.find({
            order: {id: sort},
            relations: ["comments"],
        })
        
    }

    getBoard(id) {
        return this.boardRepository.findOneBy({
            id: id,
        });
    }

    updateBoard(updateBoardInput: UpdateBoardInput, board: Board): Promise<Board> {
        board.title = updateBoardInput.title;
        board.context = updateBoardInput.context;
        return this.boardRepository.save(board);
    }

    async deleteBoard(id) {
        const result = await this.boardRepository.delete({id: id});
        if (result.affected === 0) {
            throw new NotFoundException('Board Not Fount');
        }
        return "Delete Success"; 
    }

}
