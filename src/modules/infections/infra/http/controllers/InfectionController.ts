import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ShowInfectionsService from '@modules/infections/services/ShowInfectionsService';
import CreateInfectionService from '@modules/infections/services/CreateInfectionService';
import { classToClass } from 'class-transformer';

export default class InfectionController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showInfection = container.resolve(ShowInfectionsService);

    const { date, type } = request.query;

    const infection = await showInfection.execute({
      date: String(date),
      type: String(type),
    });

    return response.json(classToClass(infection));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createInfection = container.resolve(CreateInfectionService);

    const { latitude, longitude, desease_id } = request.body;

    const infection = await createInfection.execute({
      latitude,
      longitude,
      desease_id,
    });

    return response.json(classToClass(infection));
  }
}
