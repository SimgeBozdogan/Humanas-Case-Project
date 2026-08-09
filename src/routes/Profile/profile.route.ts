import express from 'express';
import { ProfileController } from './profile.controller';

const router = express.Router();

router.post('/profiles', ProfileController.create);
router.get('/profiles/:id', ProfileController.get);

export default router;