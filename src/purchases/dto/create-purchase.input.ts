import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsEnum, IsNumber } from 'class-validator';
import { IntegrationPlatform } from '../entities/purchase.entity';

@InputType()
export class CreatePurchaseInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  code: string;

  @Field()
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @Field(() => IntegrationPlatform)
  @IsNotEmpty()
  @IsEnum(IntegrationPlatform)
  integrationPlatform: IntegrationPlatform;

  @Field()
  @IsNotEmpty()
  @IsString()
  integrationCode: string;

  @Field()
  @IsNotEmpty()
  @IsNumber()
  customerId: number;

  @Field()
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
