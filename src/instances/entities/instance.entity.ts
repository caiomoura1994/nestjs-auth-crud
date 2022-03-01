import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from 'typeorm';

@ObjectType()
@Entity()
export class Instance extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  isActived: boolean;

  @Column({ nullable: true })
  zApiId?: string;

  @Column({ nullable: true })
  zApiToken: string;

  @Column({ nullable: true })
  webhookAfterSend: string;

  @Column({ nullable: true })
  webhookAfterDisconnect: string;

  @Column({ nullable: true })
  webhookAfterReceive: string;

  @ManyToOne(
    () => User,
    user => user.instances,
    { nullable: true },
  )
  owner?: User;
}
