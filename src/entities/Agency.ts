import { ChildEntity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Owner } from "./Owner";
import { User } from "./User";

@ChildEntity()
export class Agency extends Owner {
    @OneToMany(() => User, user => user.agency)
    public users!: User[];
}
