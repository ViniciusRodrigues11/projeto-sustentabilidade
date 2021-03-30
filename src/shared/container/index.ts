import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UsersTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IInfectionRepository from '@modules/infections/repositories/IInfectionRepository';
import InfectionRepository from '@modules/infections/infra/typeorm/repositories/InfectionRepository';

import IDeseaseRepository from '@modules/infections/repositories/IDeseaseRepository';
import DeseaseRepository from '@modules/infections/infra/typeorm/repositories/DeseaseRepository';

container.registerSingleton<IUserRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UsersTokensRepository,
);

container.registerSingleton<IInfectionRepository>(
  'InfectionRepository',
  InfectionRepository,
);

container.registerSingleton<IDeseaseRepository>(
  'DeseaseRepository',
  DeseaseRepository,
);
