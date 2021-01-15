/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProvidersAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.body;

    const listAppointments = container.resolve(ListProviderAppointmentsService);

    const appointments = await listAppointments.execute({
      provider_id,
      day,
      month,
      year,
    });

    return response.json(appointments);
  }
}
