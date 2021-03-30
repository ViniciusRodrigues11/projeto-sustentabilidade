import { Router } from 'express';

import DeseaseController from '../controllers/DeseaseController';

const deseaseRouter = Router();

const deseaseController = new DeseaseController();

deseaseRouter.get('/', deseaseController.show);

export default deseaseRouter;
