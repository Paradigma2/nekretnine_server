import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Realty } from './Realty';

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ nullable: true })
    public filename!: string;

    @ManyToOne(() => Realty, realty => realty.photos)
    public realty!: Realty;
}