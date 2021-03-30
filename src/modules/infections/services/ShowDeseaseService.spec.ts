import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeDeseaseRepository from '../repositories/fakes/FakeDeseaseRepository';
import ShowDeseaseService from './ShowDeseaseService';

let fakeDeseaseRepository: FakeDeseaseRepository;
let fakeCacheProvider: FakeCacheProvider;
let showDeseaseService: ShowDeseaseService;

describe('ShowDesease', () => {
  beforeEach(() => {
    fakeDeseaseRepository = new FakeDeseaseRepository();
    fakeCacheProvider = new FakeCacheProvider();

    showDeseaseService = new ShowDeseaseService(
      fakeDeseaseRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to show all deseases', async () => {
    const findDesease = await showDeseaseService.execute();

    expect(findDesease[0].name).toBe('Dengue');
  });
});
