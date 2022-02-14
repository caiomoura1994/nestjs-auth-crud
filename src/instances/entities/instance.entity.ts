import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@ObjectType()
@Entity()
export class Instance {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  name: string;

  @Column()
  isActived: boolean;

  @Column()
  zApiId: string;

  @Column()
  zApiToken: string;

  @Column()
  webhookAfterSend: string;

  @Column()
  webhookAfterDisconnect: string;

  @Column()
  webhookAfterReceive: string;

  @ManyToOne(
    () => User,
    user => user.instances,
  )
  owner: User;
}
