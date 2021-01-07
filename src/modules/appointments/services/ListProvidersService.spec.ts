import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUserRepository;

let listProvidersService: ListProvidersService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();

    listProvidersService = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const user0 = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhon@example.com',
      password: '123456',
    });

    const user1 = await fakeUsersRepository.create({
      name: 'Jhon Trê',
      email: 'jhon3@example.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Jhon qua',
      email: 'quaqua@example.com',
      password: '123456',
    });

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user0, user1]);
  });
});
