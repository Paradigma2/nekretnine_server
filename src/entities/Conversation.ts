import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { IsDate } from 'class-validator';
import { User } from './User';
import { Message } from './Message';

@Entity()
export class Conversation {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column('boolean', { default: false })
    public archived!: Boolean;

    @ManyToOne(() => User, user => user.buyerConversations)
    public buyer!: User;

    @ManyToOne(() => User, user => user.ownerConversations)
    public owner!: User;

    @OneToMany(() => Message, message => message.conversation)
    public messages!: Message[];

    @Column({ type: 'timestamptz' })
    @IsDate()
    public updatedAt!: Date;
}
