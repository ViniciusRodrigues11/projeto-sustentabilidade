import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ShowDeseaseService from '@modules/infections/services/ShowDeseaseService';
import { classToClass } from 'class-transformer';

export default class DeseaseController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showDesease = container.resolve(ShowDeseaseService);

    const desease = await showDesease.execute();

    return response.json(classToClass(desease));
  }
}
