import IInfectionRepository from '@modules/infections/repositories/IInfectionRepository';
import ICreateInfectionDTO from '@modules/infections/dtos/ICreateInfectionDTO';
import IFindByTypeAndDate from '@modules/infections/dtos/IFindByTypeAndDate';
import Infection from '@modules/infections/infra/typeorm/entities/Infection';
import { v4 as uuid } from 'uuid';
import { startOfToday, addDays, isAfter } from 'date-fns';

class InfectionRepository implements IInfectionRepository {
  private infections: Infection[] = [];

  public async findByTypeAndDate({
    date,
    type,
  }: IFindByTypeAndDate): Promise<Infection[]> {
    const formatedDate = new Date(addDays(startOfToday(), -date));

    const findInfections = this.infections.filter(infection => {
      return (
        isAfter(infection.created_at, formatedDate) &&
        type.includes(infection.desease_id)
      );
    });

    return findInfections;
  }

  public async create(data: ICreateInfectionDTO): Promise<Infection> {
    const infection = new Infection();

    Object.assign(infection, { id: uuid() }, data, {
      created_at: new Date(Date.now()),
      updated_at: new Date(Date.now()),
    });

    this.infections.push(infection);

    return infection;
  }

  public async save(infection: Infection): Promise<Infection> {
    const findIndex = this.infections.findIndex(
      findInfection => findInfection.id === infection.id,
    );

    this.infections[findIndex] = infection;

    return infection;
  }
}

export default InfectionRepository;
