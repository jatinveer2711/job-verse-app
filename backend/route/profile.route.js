import express from 'express';
import {createProfile,getProfile, updateProfile} from '../controllers/profile.controller.js';
import { authMiddleware,jobseakerAuthMiddleware } from '../middleware/middleware.js';

const router  = express.Router();

router.post('/createUser',authMiddleware,jobseakerAuthMiddleware,createProfile);
router.get('/getProfile',authMiddleware,jobseakerAuthMiddleware,getProfile);
router.put('/updateProfile',authMiddleware,jobseakerAuthMiddleware,updateProfile);
export default router;