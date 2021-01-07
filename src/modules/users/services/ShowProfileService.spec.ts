import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUserRepository;

let showProfileService: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();

    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhon@example.com',
      password: '123456',
    });

    const profile = await showProfileService.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Jhon Doe');
    expect(profile.email).toBe('jhon@example.com');
  });

  it('should not be able to show the profile from non-existing user', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'non existing user id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
