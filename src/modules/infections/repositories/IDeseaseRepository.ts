import Desease from '../infra/typeorm/entities/Desease';

export default interface IDeseaseRepository {
  findAll(): Promise<Desease[]>;
}
