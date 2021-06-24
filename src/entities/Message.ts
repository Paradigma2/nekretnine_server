import { Entity, Column,  PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { IsDate } from 'class-validator';
import { Conversation } from './Conversation';

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column('boolean', { default: false })
    public read!: Boolean;

    @Column()
    public content!: string;

    @ManyToOne(() => Conversation, conversation => conversation.messages)
    public conversation!: Conversation;

    @CreateDateColumn()
    @IsDate()
    public createdAt!: Date;
}
