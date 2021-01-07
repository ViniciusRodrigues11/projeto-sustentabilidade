import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { uuid } from 'uuidv4';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import { isEqual } from 'date-fns';
import Appointment from '../../infra/typeorm/entities/Appointments';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, {
      id: uuid(),
      date,
      provider_id,
    });

    appointment.id = uuid();
    appointment.provider_id = provider_id;
    appointment.date = date;

    this.appointments.push(appointment);

    return appointment;
  }
}

export default FakeAppointmentsRepository;
