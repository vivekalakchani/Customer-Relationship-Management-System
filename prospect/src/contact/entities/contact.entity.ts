import { StatusEnum } from 'src/common/status.enum';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['contactId'])
export class Contact extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  contactId: string;

  @JoinColumn({ name: 'prospectId' })
  prospectId: string;

  @Column()
  email: string;

  @Column()
  telNo: number;

  @Column({ default: StatusEnum.ACTIVE })
  status: StatusEnum;

  @Column()
  type: string;

  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at', select: false })
  updatedAt: Date;
}
