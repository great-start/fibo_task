import { Router } from 'express';
import { appController } from "../controllers/app.controller";

const router = Router();

router.post('/input', appController.getTicket);
router.get('/output', appController.getFiboNumber);

export const apiRouter = router;