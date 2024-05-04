import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IntegrationPlatform } from '../entities/purchase.entity';
import { CustomerOutput } from 'src/customers/dto/customer.output';
import { UserOutput } from 'src/users/dto/user.output';

@ObjectType()
export class PurchaseOutput {
  @Field(() => ID)
  id: string;

  @Field()
  code: string;

  @Field()
  amount: number;

  @Field(() => IntegrationPlatform)
  integrationPlatform: IntegrationPlatform;

  @Field()
  integrationCode: string;

  @Field()
  customerId: string;

  @Field(() => CustomerOutput)
  customer: CustomerOutput;

  @Field()
  userId: string;

  @Field(() => UserOutput)
  user: UserOutput;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  deletedAt: Date;
}
