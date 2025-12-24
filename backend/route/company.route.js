import express from 'express';
import { createCompany,getCompanyByRecruter,updateCompany } from '../controllers/company.controller.js';
import {authMiddleware,recruiterAuthMiddleware}from '../middleware/middleware.js'

const router = express.Router();

router.post('/create',authMiddleware,recruiterAuthMiddleware,createCompany);
router.get('/getAll',authMiddleware,recruiterAuthMiddleware,getCompanyByRecruter)
router.put('/updateCompany',authMiddleware,recruiterAuthMiddleware,updateCompany)

export default router;
