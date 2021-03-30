import 'reflect-metadata';
import IDeseaseRepository from '@modules/infections/repositories/IDeseaseRepository';
import Desease from '@modules/infections/infra/typeorm/entities/Desease';

class DeseaseRepository implements IDeseaseRepository {
  private desease: Desease[] = [
    {
      id: 'asdafsd4as54df6',
      name: 'Dengue',
      description: 'Infecção viral',
      created_at: new Date(Date.now()),
      updated_at: new Date(Date.now()),
    },
  ];

  public async findAll(): Promise<Desease[]> {
    const result = this.desease;

    return result;
  }
}

export default DeseaseRepository;
