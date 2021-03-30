import { inject, injectable } from 'tsyringe';

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
  ) {}

  public async execute({ date, type }: IRequest): Promise<Infection[]> {
    const formattedType = type.split(',');

    const infections = await this.infectionRepository.findByTypeAndDate({
      date,
      type: formattedType,
    });

    return infections;
  }
}

export default ShowInfectionsService;
