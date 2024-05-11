import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

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
  customerId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;
}
