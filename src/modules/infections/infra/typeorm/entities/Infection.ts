import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import Desease from './Desease';

@Entity('infection')
class Infection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column()
  disease_id: string;

  @ManyToOne(() => Desease)
  @JoinColumn({ name: 'desease_id' })
  desease: Desease;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Infection;
