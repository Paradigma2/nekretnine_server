import { Entity, Column,  PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Realty } from './Realty';
import { User } from './User';

@Entity()
export class Offer {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column('boolean', { default: false })
    public accepted!: Boolean;

    @ManyToOne(() => User, user => user.offers)
    public user!: User;

    @ManyToOne(() => Realty, realty => realty.offers)
    public realty!: Realty;

    @Column({ type: 'date', nullable: true })
    public from!: string;

    @Column({ type: 'date', nullable: true })
    public to!: string;
}
