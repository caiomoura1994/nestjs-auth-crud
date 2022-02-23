import { ObjectType, Field, ID, HideField } from '@nestjs/graphql';
import { hashPasswordTransform } from '../common/transformers/crypto-transform';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Instance } from '../instances/entities/instance.entity';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID, { nullable: true })
  id?: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({
    transformer: hashPasswordTransform,
  })
  @HideField()
  password: string;

  @OneToMany(
    () => Instance,
    instance => instance.id,
    { nullable: true },
  )
  instances?: Instance[];
}
