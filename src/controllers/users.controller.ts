import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {validate} from 'class-validator';
import {User} from '../entities/User'

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user = new User();

        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        user.firstName = req.body.first_name;
        user.lastName = req.body.last_name;
        user.country = req.body.country;
        user.city = req.body.city;
        user.profilePicture = req.body.profilePicture || "../default_profile_picture.jpg";
        user.birthday = new Date(req.body.birthday);
        user.role = req.body.role;

        const errors = await validate(user, { forbidUnknownValues: true, skipMissingProperties: true });
        if (errors.length > 0) { return res.status(422).json(errors); }

        const userRepository = getRepository(User);
        await userRepository.save(user);

        return res.status(201).json(user);
    } catch(e) {
        console.log(e);
        return res.status(500).json('Internal server error');
    }
}

export const authenticate = async (req: Request, res: Response): Promise<Response> => {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        return res.status(200).json(user);
    } else {
        return res.status(404).json(user);
    }
}
