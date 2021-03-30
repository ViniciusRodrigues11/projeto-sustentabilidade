import { getRepository, Repository, In, MoreThanOrEqual } from 'typeorm';
import IInfectionRepository from '@modules/infections/repositories/IInfectionRepository';
import ICreateInfectionDTO from '@modules/infections/dtos/ICreateInfectionDTO';
import IFindByTypeAndDate from '@modules/infections/dtos/IFindByTypeAndDate';
import { formatISO, addDays, startOfToday } from 'date-fns';
import Infection from '../entities/Infection';

class InfectionRepository implements IInfectionRepository {
  private ormRepository: Repository<Infection>;

  constructor() {
    this.ormRepository = getRepository(Infection);
  }

  public async findByTypeAndDate({
    date,
    type,
  }: IFindByTypeAndDate): Promise<Infection[]> {
    const formatedDate = formatISO(new Date(addDays(startOfToday(), -date)));

    const infections = await this.ormRepository.find({
      where: {
        desease_id: In(type),
        created_at: MoreThanOrEqual(formatedDate),
      },
      relations: ['desease'],
      select: ['id', 'latitude', 'longitude', 'created_at', 'desease'],
    });

    return infections;
  }

  public async create(data: ICreateInfectionDTO): Promise<Infection> {
    const newInfection = this.ormRepository.create(data);
    await this.ormRepository.save(newInfection);

    return newInfection;
  }

  public async save(infection: Infection): Promise<Infection> {
    return this.ormRepository.save(infection);
  }
}

export default InfectionRepository;
