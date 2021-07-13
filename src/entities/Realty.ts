import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { IsDate, IsEnum } from 'class-validator';
import { Offer } from './Offer';
import { Owner } from './Owner';
import { Photo } from './Photo';

export enum RealtyType {
    HOUSE = 'house',
    APARTMENT = 'apartment'
}

export enum Purpose {
    RENT = 'rent',
    SALE = 'sale'
}

export enum OwnerType {
    AGENCY = 'agency',
    USER = 'user'
}

export enum RealtyStatus {
    PENDING = 'pending',
    REGISTERED = 'registered',
    SOLD = 'sold'
}

@Entity()
export class Realty {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ nullable: true })
    public description!: string;

    @Column()
    public address!: string;

    @Column()
    public city!: string;

    @Column()
    public county!: string;

    @Column({ nullable: true })
    public level!: string;

    @Column()
    public size!: number;

    @Column()
    public price!: number;

    @Column({ nullable: true })
    public roomCount!: string;

    @Column({ nullable: true })
    @IsEnum(RealtyType)
    public realtyType!: RealtyType;

    @Column()
    @IsEnum(Purpose)
    public purpose!: Purpose;

    @Column({ default: RealtyStatus.PENDING })
    @IsEnum(RealtyStatus)
    public status!: RealtyStatus;

    @Column()
    @IsEnum(OwnerType)
    public ownerType!: OwnerType;

    @ManyToOne(() => Owner, owner => owner.realties)
    public owner!: Owner;

    @Column('boolean', { default: false })
    public promoted!: Boolean;

    @Column({ default: 0 })
    public viewCount!: number;

    @OneToMany(() => Photo, photo => photo.realty)
    public photos!: Photo[];

    @OneToMany(() => Offer, offer => offer.realty)
    public offers!: Offer[];

    @CreateDateColumn()
    @IsDate()
    public createdAt!: Date;
}
