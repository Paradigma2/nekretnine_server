import { ChildEntity, Column, ManyToOne, OneToMany } from 'typeorm';
import { IsEnum } from 'class-validator';
import { Agency } from './Agency';
import { Conversation } from './Conversation';
import { Owner } from './Owner';
import { Offer } from './Offer';

export enum UserRole {
    BASIC = 'basic',
    AGENT = 'agent',
    ADMIN = 'administrator'
}

export enum UserStatus {
    PENDING = 'pending',
    REGISTERED = 'registered'
}

@ChildEntity()
export class User extends Owner {
    @Column()
    public password?: string;

    @Column({ nullable: true })
    public firstName!: string;

    @Column({ nullable: true })
    public lastName!: string;

    @Column()
    @IsEnum(UserRole)
    public role!: UserRole;

    @Column()
    @IsEnum(UserStatus)
    public status!: UserStatus;

    @Column()
    public profilePicture!: string;

    @ManyToOne(() => Agency, agency => agency.users, { nullable: true })
    public agency!: Agency;

    @OneToMany(() => Conversation, conversation => conversation.buyer)
    public buyerConversations!: Conversation[];

    @OneToMany(() => Offer, offer => offer.user)
    public offers!: Offer[];
}
