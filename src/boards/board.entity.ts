import { Comment } from './../comments/comment.entity';
import { FIELD_RESOLVER_MIDDLEWARE_METADATA, Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/user.entity";
import { text } from "stream/consumers";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
@ObjectType()
export class Board{
    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: number;

    @Column({type: "varchar", length: 20})
    @Field()
    title: string;

    @Column({type: "text"})
    @Field()
    context: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @ManyToOne(() => User, (user) => user.boards)
    user: User;

    @OneToMany(() => Comment, (comment) => comment.boards, {cascade: true, eager: true})
    comments: Comment[];

}