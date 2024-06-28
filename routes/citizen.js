import express from 'express';
import * as citizenController from '../controllers/citizen.js'
const citizenRouter = express.Router();

citizenRouter.post('/', citizenController.createCitizen);
citizenRouter.get('/', citizenController.getCitizenBySSN);

export default citizenRouter;

