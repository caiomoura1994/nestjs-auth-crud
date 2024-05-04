import { ObjectType, Field, ID, HideField } from '@nestjs/graphql';
import { hashPasswordTransform } from '../common/transformers/crypto-transform';
import { Entity, PrimaryColumn, Column } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@ObjectType()
@Entity({ name: 'users' })
export class User {
  @PrimaryColumn('uuid', { default: () => uuidv4() })
  @Field(() => ID)
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({
    transformer: hashPasswordTransform,
  })
  @HideField()
  password: string;
}
