import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserOutput } from 'src/users/dto/user.output';

@ObjectType()
export class CustomerOutput {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  userId: number;

  @Field(() => UserOutput)
  user: UserOutput;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  deletedAt: Date;
}
