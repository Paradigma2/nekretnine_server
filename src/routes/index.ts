import {Router} from 'express';

const router = Router();

router.post('/users', (req, res) => {
    res.send('Bonjour tout les monde!')
});

export default router;