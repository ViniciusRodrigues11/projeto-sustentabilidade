import { inject, injectable } from 'tsyringe';
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

    return infection;
  }
}

export default CreateInfectionService;
