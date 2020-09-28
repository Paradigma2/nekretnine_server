import {IsDate, IsEmail, IsEnum} from 'class-validator';
import {Entity, PrimaryGeneratedColumn, Column, Unique} from 'typeorm';

export enum userRole {
    BASIC = 'basic',
    MOD = 'moderator',
    ADMIN = 'administrator'
}

@Entity()
@Unique(['email', 'username'])
export class User {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public username!: string;

    @Column()
    public password?: string;

    @Column()
    @IsEmail()
    public email!: string;

    @Column()
    public firstName!: string;

    @Column()
    public lastName!: string;

    @Column()
    @IsEnum(userRole)
    public role!: userRole;

    @Column()
    public profilePicture!: string;

    @Column()
    @IsDate()
    public birthday!: Date;

    @Column()
    public country!: string;

    @Column()
    public city!: string;
}
