import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import InfectionController from '../controllers/InfectionController';

const infectionRouter = Router();

infectionRouter.use(ensureAuthenticated);

const infectionController = new InfectionController();

infectionRouter.get('/', infectionController.show);
infectionRouter.post('/new-infection', infectionController.create);

export default infectionRouter;
