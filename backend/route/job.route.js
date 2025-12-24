import express from 'express';
import{postJob,getJob,searchJob,updateJob, delteJobs, fetchById} from '../controllers/job.controller.js';
import { authMiddleware,recruiterAuthMiddleware } from '../middleware/middleware.js';

const router = express.Router();

router.post('/post-job',authMiddleware,recruiterAuthMiddleware,postJob);
router.put('/update-job/:id',authMiddleware,recruiterAuthMiddleware,updateJob);
router.delete('/delete-job/:id',authMiddleware,recruiterAuthMiddleware,delteJobs);

router.get('/get-job',authMiddleware,getJob);
router.get('/get-Job/:id',authMiddleware,recruiterAuthMiddleware,fetchById)
router.get('/searchJob',authMiddleware,searchJob);


export default router