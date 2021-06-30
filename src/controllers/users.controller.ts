import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { validate } from 'class-validator';
import { User, UserRole, UserStatus } from '../entities/User';

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user = new User();

        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.country = req.body.country;
        user.city = req.body.city;
        user.role = req.body.role || UserRole.BASIC;
        user.status = req.body.status || UserStatus.PENDING;

        user.profilePicture = req.file?.filename || 'default_profile_picture.jpg';

        const errors = await validate(user, { skipMissingProperties: true });
        if (errors.length > 0) { return res.status(422).json(errors); }

        const entityManger = getManager();
        await entityManger.save(User, user);

        return res.status(201).json(user);
    } catch(err) {
        console.log(err);
        return res.status(500).json('Internal server error');
    }
}

export const authenticate = async (req: Request, res: Response): Promise<Response> => {
    const entityManger = getManager();
    const user = await entityManger.findOne(User, {
        username: req.body.username,
        password: req.body.password,
        status: UserStatus.REGISTERED
    });

    if (user) return res.status(200).json(user);
    else return res.status(404).json(user);
}

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const entityManger = getManager();
    let user = await entityManger.findOne(User, req.params.id);

    if (user) {
        if (req.body.username) user.username = req.body.username;
        if (req.body.password) user.password = req.body.password;
        if (req.body.email) user.email = req.body.email;
        if (req.body.first_name) user.firstName = req.body.first_name;
        if (req.body.lastName) user.lastName = req.body.last_name;
        if (req.body.country) user.country = req.body.country;
        if (req.body.city) user.city = req.body.city;
        if (req.body.profilePicture) user.profilePicture = req.body.profilePicture;
        if (req.body.status) user.status = req.body.status;
        await entityManger.save(User, user);
        return res.status(200).json(user);
    } else {
        return res.status(404).json(user);
    }
}
