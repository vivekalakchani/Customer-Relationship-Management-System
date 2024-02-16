import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { StatusEnum } from '../../common/status.enum';
@Entity()
@Unique(['prospectId'])
export class Prospect extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  prospectId: string;

  @Column()
  prospectName: string;

  @Column({ default: StatusEnum.ACTIVE })
  status: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at', select: false })
  updatedAt: Date;
}
