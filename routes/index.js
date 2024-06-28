import express from 'express';
import citizenRouter from './citizen.js'

const router = express.Router();

router.use('/citizens', citizenRouter);

export default router;