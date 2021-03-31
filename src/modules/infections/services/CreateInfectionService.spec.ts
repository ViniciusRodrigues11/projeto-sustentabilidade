import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeInfectionRepository from '../repositories/fakes/FakeInfectionRepository';
import CreateInfectionService from './CreateInfectionService';

let fakeInfectionRepository: FakeInfectionRepository;
let fakeCacheProvider: FakeCacheProvider;

let createInfectionService: CreateInfectionService;

describe('CreateInfection', () => {
  beforeEach(() => {
    fakeInfectionRepository = new FakeInfectionRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createInfectionService = new CreateInfectionService(
      fakeInfectionRepository,
      fakeCacheProvider,
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
