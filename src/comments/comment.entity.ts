import { Board } from './../boards/board.entity';
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Max } from "class-validator";
import { User } from "src/users/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
@ObjectType()
export class Comment{
    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: number;

    @Column({type: 'varchar', length: 80})
    @Field()
    content: string;

    @Column({type: 'integer'})
    @Max(3)
    @Field()
    depth: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.comments)
    user: User;

    @Field(type => Int)
    @Column()
    boardId: number;

    @ManyToOne(() => Board, (board) => board.comments, {onDelete: "CASCADE"})
    boards: Board;

    @ManyToOne(() => Comment, comment => comment.childComments)
    parentComment: Comment;

    @OneToMany(() => Comment, comment => comment.parentComment)
    childComments: Comment[];
}