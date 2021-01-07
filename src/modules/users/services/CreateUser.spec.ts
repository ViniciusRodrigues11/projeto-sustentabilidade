import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email', async () => {
    await createUserService.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    expect(
      createUserService.execute({
        name: 'Jhon Doe 2',
        email: 'jhondoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
