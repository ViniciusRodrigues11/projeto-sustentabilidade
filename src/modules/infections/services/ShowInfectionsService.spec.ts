import FakeInfectionRepository from '../repositories/fakes/FakeInfectionRepository';
import ShowInfectionsService from './ShowInfectionsService';

let fakeInfectionRepository: FakeInfectionRepository;

let showInfectionsService: ShowInfectionsService;

describe('ShowInfection', () => {
  beforeEach(() => {
    fakeInfectionRepository = new FakeInfectionRepository();

    showInfectionsService = new ShowInfectionsService(fakeInfectionRepository);
  });

  it('should be able to show the infection', async () => {
    await fakeInfectionRepository.create({
      latitude: '-8.54801354564',
      longitude: '-63.4847561234',
      desease_id: 'asdfa4sdf5a4',
    });

    const infection = await fakeInfectionRepository.create({
      latitude: '-8.54801354564',
      longitude: '-63.4847561234',
      desease_id: '123456',
    });

    const findInfection = await showInfectionsService.execute({
      date: '7',
      type: infection.desease_id,
    });

    expect(findInfection[0].latitude).toBe('-8.54801354564');
    expect(findInfection[0].desease_id).toBe('123456');
  });
});
