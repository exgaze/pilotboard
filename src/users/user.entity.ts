import { Comment } from './../comments/comment.entity';
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { IsEmail } from "class-validator";
import { Board } from "src/boards/board.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class User{
    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: number;

    @Column({type: "varchar", length: 50, unique: true})
    @Field()
    email!: string;

    @Column({type: "varchar"})
    @Field()
    password: string;

    @Column({type: "varchar", length: 10})
    @Field()
    nickname: string;

    @Column({type: "varchar", length: 50, nullable: true})
    @Field()
    description?: string;

    @OneToMany(() => Board, (board) => board.user)
    @Field(() => [Board], {nullable: true})
    boards: Board[];
    
    @OneToMany(() => Comment, (comment) => comment.user)
    @Field(() => [Comment], {nullable: true})
    comments: Comment[];

}