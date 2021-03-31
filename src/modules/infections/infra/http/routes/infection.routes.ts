import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import InfectionController from '../controllers/InfectionController';

const infectionRouter = Router();

const infectionController = new InfectionController();

infectionRouter.get('/', infectionController.show);
infectionRouter.post(
  '/new-infection',
  ensureAuthenticated,
  infectionController.create,
);

export default infectionRouter;
