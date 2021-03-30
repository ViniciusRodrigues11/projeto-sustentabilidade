import FakeInfectionRepository from '../repositories/fakes/FakeInfectionRepository';
import CreateInfectionService from './CreateInfectionService';

let fakeInfectionRepository: FakeInfectionRepository;

let createInfectionService: CreateInfectionService;

describe('CreateInfection', () => {
  beforeEach(() => {
    fakeInfectionRepository = new FakeInfectionRepository();

    createInfectionService = new CreateInfectionService(
      fakeInfectionRepository,
    );
  });

  it('should be able to create a infection', async () => {
    const infection = await createInfectionService.execute({
      latitude: '-8.54801354564',
      longitude: '-63.54651874161',
      desease_id: 'asd2458f1236',
    });

    expect(infection).toHaveProperty('id');
  });
});
