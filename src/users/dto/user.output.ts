import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class UserOutput {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;
}
