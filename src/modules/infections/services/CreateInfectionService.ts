import { inject, injectable } from 'tsyringe';
import CacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Infection from '../infra/typeorm/entities/Infection';
import IInfectionRepository from '../repositories/IInfectionRepository';

interface IRequest {
  latitude: string;
  longitude: string;
  desease_id: string;
}
@injectable()
class CreateInfectionService {
  constructor(
    @inject('InfectionRepository')
    private infectionRepository: IInfectionRepository,

    @inject('CacheProvider')
    private cacheProvider: CacheProvider,
  ) {}

  public async execute({
    latitude,
    longitude,
    desease_id,
  }: IRequest): Promise<Infection> {
    const infection = this.infectionRepository.create({
      latitude,
      longitude,
      desease_id,
    });

    this.cacheProvider.invalidatePrefix('infection');

    return infection;
  }
}

export default CreateInfectionService;
