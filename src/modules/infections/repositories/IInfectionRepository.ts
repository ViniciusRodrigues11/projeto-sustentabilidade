import Infection from '../infra/typeorm/entities/Infection';
import ICreateInfectionDTO from '../dtos/ICreateInfectionDTO';
import IFindByTypeAndDate from '../dtos/IFindByTypeAndDate';

export default interface IInfectionRepository {
  create(data: ICreateInfectionDTO): Promise<Infection>;
  save(infection: Infection): Promise<Infection>;
  findByTypeAndDate(data: IFindByTypeAndDate): Promise<Infection[]>;
}
