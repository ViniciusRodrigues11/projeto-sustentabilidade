import { inject, injectable } from 'tsyringe';
import CacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';
import IInfectionRepository from '../repositories/IInfectionRepository';
import Infection from '../infra/typeorm/entities/Infection';

interface IRequest {
  date: string;
  type: string;
}

@injectable()
class ShowInfectionsService {
  constructor(
    @inject('InfectionRepository')
    private infectionRepository: IInfectionRepository,

    @inject('CacheProvider')
    private cacheProvider: CacheProvider,
  ) {}

  public async execute({ date, type }: IRequest): Promise<Infection[]> {
    const formattedType = type.split(',');
    const cacheKey = `infection:${date}-${type}`;

    let infections = await this.cacheProvider.recover<Infection[]>(cacheKey);

    if (!infections) {
      infections = await this.infectionRepository.findByTypeAndDate({
        date,
        type: formattedType,
      });
    }

    await this.cacheProvider.save(cacheKey, classToClass(infections));

    return infections;
  }
}

export default ShowInfectionsService;
