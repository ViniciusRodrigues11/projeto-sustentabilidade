import AppError from '@shared/errors/AppError';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import ResetPasswordService from './ResetPasswordService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUserRepository;
let fakeHash: FakeHashProvider;
let fakeUserToken: FakeUserTokenRepository;
let resetPasswordService: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeHash = new FakeHashProvider();
    fakeUserToken = new FakeUserTokenRepository();

    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserToken,
      fakeHash,
    );
  });

  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhon@example.com',
      password: '123456',
    });

    const generateHash = jest.spyOn(fakeHash, 'generateHash');

    const { token } = await fakeUserToken.generate(user.id);

    await resetPasswordService.execute({
      password: '123123',
      token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(updatedUser?.password).toBe('123123');
    expect(generateHash).toHaveBeenCalledWith('123123');
  });
  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPasswordService.execute({
        token: 'non-existing-token',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to reset the password with non-existing user', async () => {
    const { token } = await fakeUserToken.generate('non-existing-user');

    await expect(
      resetPasswordService.execute({
        token,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to reset password if passed more than 2 hours', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhon@example.com',
      password: '123456',
    });

    const { token } = await fakeUserToken.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({
        password: '123123',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
