import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update a user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhon@example.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jhon Trê',
      email: 'jhon3@example.com',
    });

    expect(updatedUser.name).toBe('Jhon Trê');
    expect(updatedUser.email).toBe('jhon3@example.com');
  });

  it('should not be able to show the profile from non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non existing user id',
        name: 'Test',
        email: 'test@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change the email if already exists', async () => {
    await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhon@example.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Jhon Trê',
      email: 'jhon3@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jhon Doe',
        email: 'jhon@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhon@example.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jhon Trê',
      email: 'jhon3@example.com',
      password: '123123',
      old_password: '123456',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhon@example.com',
      password: '123456',
    });

    expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jhon Trê',
        email: 'jhon3@example.com',
        password: '121212',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update password with incorrect old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhon@example.com',
      password: '123456',
    });

    expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jhon Trê',
        email: 'jhon3@example.com',
        password: '121212',
        old_password: 'incorrect-old-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
