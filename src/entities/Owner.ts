import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany, TableInheritance } from 'typeorm';
import { IsEmail } from 'class-validator';
import { Conversation } from './Conversation';
import { Realty } from './Realty';

@Entity()
@Unique(['email', 'username'])
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class Owner {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public username!: string;

    @Column()
    @IsEmail()
    public email!: string;

    @Column({ nullable: true })
    public country!: string;

    @Column({ nullable: true })
    public city!: string;

    @OneToMany(() => Realty, realty => realty.owner)
    public realties!: Realty[];

    @OneToMany(() => Conversation, conversation => conversation.owner)
    public ownerConversations!: Conversation[];
}
