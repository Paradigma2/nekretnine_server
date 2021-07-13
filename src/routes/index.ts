import multer from 'multer';
import { Router } from 'express';
import { authenticate, createUser, updateUser } from '../controllers/users.controller';
import { createRealty, indexRealties, updateRealty, createPhoto, indexPhotos, getPhoto } from '../controllers/realties.controller';
import { createOffer, indexOffers, updateOffer, acceptOffer } from '../controllers/offers.controller';

const router = Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public');
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/').pop();
        cb(null, file.originalname);
    }
  })
const upload = multer({ storage: storage })

router.post('/users', upload.single('profilePicture'), createUser);
router.post('/users/authenticate', authenticate);
router.put('/users/:id', updateUser);

router.post('/realties', createRealty);
router.get('/realties', indexRealties);
router.put('/realty/:id', updateRealty);
router.post('/realty/:id/photos', upload.single('photo'), createPhoto);
router.get('/realty/:id/photos', indexPhotos);
router.get('/realty/:id/photo', getPhoto);

router.post('/offers', createOffer);
router.get('/offers', indexOffers);
router.put('/offer/:id', updateOffer);
router.post('/offer/:id/accept', acceptOffer);

export default router;
