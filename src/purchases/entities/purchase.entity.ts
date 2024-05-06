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

  @Column({
    name: 'integration_platform',
    type: 'enum',
    enum: IntegrationPlatform,
  })
  integrationPlatform: string;

  @Column({ name: 'integration_code' })
  integrationCode: string;

  @Column({ name: 'customer_id' })
  customerId: string;

  @Column({ name: 'user_id' })
  userId: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;
}
