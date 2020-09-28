import {Router} from 'express';
import {authenticate, createUser} from '../controllers/users.controller'

const router = Router();

router.post('/users', createUser);
router.post('/users/authenticate', authenticate);

export default router;