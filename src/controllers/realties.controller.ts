import { Request, Response } from 'express';
import { getManager, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { validate } from 'class-validator';
import { Realty, OwnerType, RealtyStatus } from '../entities/Realty';
import { Photo } from '../entities/Photo';

export const createRealty = async (req: Request, res: Response): Promise<Response> => {
    try {
        const realty = new Realty();
        const user = req.body.user;

        realty.description = req.body.description;
        realty.address = req.body.address;
        realty.city = req.body.city;
        realty.county = req.body.county;
        realty.level = req.body.level;
        realty.size = req.body.size;
        realty.price = req.body.price;
        realty.roomCount = req.body.roomCount;
        realty.realtyType = req.body.type;
        realty.purpose = req.body.purpose;
        realty.status = req.body.status || RealtyStatus.PENDING;
        realty.promoted = req.body.promoted || false;

        if (user) {
            switch(user.role) {
                case 'basic':
                    realty.ownerType = OwnerType.USER;
                    realty.owner = user.id;
                    break;
                case 'agent':
                    realty.ownerType = OwnerType.AGENCY;
                    realty.owner = user.agency.id;
                    break;
            }
        }

        const errors = await validate(realty, { skipMissingProperties: true });
        if (errors.length > 0) { return res.status(422).json(errors); }

        const entityManger = getManager();
        await entityManger.save(Realty, realty);

        return res.status(201).json(realty);
    } catch(err) {
        console.log(err);
        return res.status(500).json('Internal server error');
    }
}

export const indexRealties = async (req: Request, res: Response): Promise<Response> => {
    const entityManger = getManager();
    const filters: Record<string,any> = {};

    if (req.query.city) filters.city = req.query.city;
    if (req.query.promoted) filters.promoted = req.query.promoted;
    if (req.query.from) filters.price = MoreThanOrEqual(req.query.from);
    if (req.query.to) filters.price = LessThanOrEqual(req.query.to);

    const realties = await entityManger.find(Realty, filters);
    return res.status(200).json(realties);
}

export const updateRealty  = async (req: Request, res: Response): Promise<Response> =>{
    const entityManger = getManager();
    let realty = await entityManger.findOne(Realty, req.params.id);

    if (realty) {
        realty.description = req.body?.description;
        realty.address = req.body?.address;
        realty.city = req.body?.city;
        realty.county = req.body?.county;
        realty.level = req.body?.level;
        realty.size = req.body?.size;
        realty.price = req.body?.price;
        realty.roomCount = req.body?.roomCount;
        realty.realtyType = req.body?.realtyType;
        realty.purpose = req.body?.purpose;
        realty.status = req.body?.status;
        realty.promoted = req.body?.promoted;
        await entityManger.save(Realty, realty);
        return res.status(200).json(realty);
    } else {
        return res.status(404).json(realty);
    }
}

export const createPhoto = async (req: Request, res: Response): Promise<Response> => {
    try {
        const entityManger = getManager();
        const photo = new Photo();

        const realty = await entityManger.findOne(Realty, req.params.id);
        photo.filename = req.body.filename;
        photo.realty = realty as Realty;

        const errors = await validate(photo, { skipMissingProperties: true });
        if (errors.length > 0) { return res.status(422).json(errors); }

        await entityManger.save(Photo, photo);

        return res.status(201).json(photo);
    } catch(err) {
        console.log(err);
        return res.status(500).json('Internal server error');
    }
}

export const indexPhotos = async (req: Request, res: Response): Promise<Response> => {
    const entityManger = getManager();
    let photos;

    if (req.params.id) photos = await entityManger.find(Photo, { where: { realty: req.params.id } });
    else photos = entityManger.find(Photo);

    return res.status(200).json(photos);
}

export const getPhoto = async (req: Request, res: Response): Promise<Response> => {
    const entityManger = getManager();
    let photos;

    photos = await entityManger.findOne(Photo, { where: { realty: req.params.id } });

    return res.status(200).json(photos);
}