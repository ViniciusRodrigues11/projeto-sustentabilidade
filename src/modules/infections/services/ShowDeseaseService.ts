import { inject, injectable } from 'tsyringe';
import CacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import { classToClass } from 'class-transformer';
import IDeseaseRepository from '../repositories/IDeseaseRepository';
import Desease from '../infra/typeorm/entities/Desease';

@injectable()
class ShowDeseaseService {
  constructor(
    @inject('DeseaseRepository')
    private deseaseRepository: IDeseaseRepository,

    @inject('CacheProvider')
    private cacheProvider: CacheProvider,
  ) {}

  public async execute(): Promise<Desease[]> {
    const cacheKey = `desease:default`;

    let desease = await this.cacheProvider.recover<Desease[]>(cacheKey);

    if (!desease) {
      desease = await this.deseaseRepository.findAll();
    }

    await this.cacheProvider.save(cacheKey, classToClass(desease));

    return desease;
  }
}

export default ShowDeseaseService;
