// import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUserRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserToken: FakeUserTokenRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserToken = new FakeUserTokenRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserToken,
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhon@example.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'jhon@example.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recober a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'jhondoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserToken, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhon@example.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'jhon@example.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
