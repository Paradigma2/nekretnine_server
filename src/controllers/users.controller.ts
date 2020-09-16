import {Request, Response} from 'express';

import {pool} from '../database';

const getUsers = (req: Request, res: Response) => {
    const users = await pool.query
}