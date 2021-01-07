import { Router } from 'express';
import ProfileContoller from '../controllers/ProfileContoller';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();

const profileController = new ProfileContoller();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.create);

export default profileRouter;
