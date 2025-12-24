import express from 'express';
import { applyJob,deleteApplication,getApplication ,recruiterApplications, updateApplications} from '../controllers/application.controller.js';
import { jobseakerAuthMiddleware,authMiddleware ,recruiterAuthMiddleware} from "../middleware/middleware.js";


const router = express.Router();
router.post('/apply',authMiddleware,jobseakerAuthMiddleware,applyJob);
router.get('/getApplication',authMiddleware,getApplication);
router.get("/recruiter/applications", authMiddleware,recruiterAuthMiddleware, recruiterApplications);
router.put("/update/applications/:id", authMiddleware,recruiterAuthMiddleware, updateApplications);
router.delete("/delete/applications/:id", authMiddleware,jobseakerAuthMiddleware, deleteApplication);

export default router;

