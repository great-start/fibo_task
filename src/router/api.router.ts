import { Router } from 'express';
import { appController } from "../controllers/app.controller";

const router = Router();

router.post('/input', appController.getTicket);

export const apiRouter = router;