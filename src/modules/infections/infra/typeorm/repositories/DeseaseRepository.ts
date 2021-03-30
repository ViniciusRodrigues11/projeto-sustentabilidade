import { getRepository, Repository } from 'typeorm';
import IDeseaseRepository from '@modules/infections/repositories/IDeseaseRepository';
import Desease from '../entities/Desease';

class DeseaseRepository implements IDeseaseRepository {
  private ormRepository: Repository<Desease>;

  constructor() {
    this.ormRepository = getRepository(Desease);
  }

  public async findAll(): Promise<Desease[]> {
    const result = await this.ormRepository.find();

    return result;
  }
}

export default DeseaseRepository;
