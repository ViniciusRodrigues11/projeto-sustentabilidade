import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';

import DeseaseSeed from '../seeds/desease.seed';

export default class SeedDesease1616817516575 implements MigrationInterface {
  public async up(_: QueryRunner): Promise<void> {
    await getRepository('desease').save(DeseaseSeed);
  }

  public async down(_: QueryRunner): Promise<void> {
    // do nothing
  }
}
