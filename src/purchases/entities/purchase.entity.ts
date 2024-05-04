import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export enum IntegrationPlatform {
  OMIE = 'OMIE',
  TRAY = 'TRAY',
  NUVEM_SHOP = 'NUVEM_SHOP',
}

registerEnumType(IntegrationPlatform, {
  name: 'IntegrationPlatform',
});

@ObjectType()
@Entity({ name: 'purchases' })
export class Purchase {
  @PrimaryColumn('uuid', { default: () => uuidv4() })
  @Field(() => ID)
  id: string;

  @Column()
  code: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'enum', enum: IntegrationPlatform })
  integrationPlatform: string;

  @Column()
  integrationCode: string;

  @Column()
  customerId: string;

  @Column()
  userId: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
