import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import PasswordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import infectionRouter from '@modules/infections/infra/http/routes/infection.routes';
import deseaseRouter from '@modules/infections/infra/http/routes/desease.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', PasswordRouter);

routes.use('/profile', profileRouter);

routes.use('/infections', infectionRouter);
routes.use('/desease', deseaseRouter);

export default routes;
