import { InputType, Field, ID } from '@nestjs/graphql';
import { IsOptional, IsString, IsEnum, IsNumber } from 'class-validator';
import { IntegrationPlatform } from '../entities/purchase.entity';

@InputType()
export class UpdatePurchaseInput {
  @Field(() => ID)
  @IsNumber()
  id: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  code?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @Field(() => IntegrationPlatform, { nullable: true })
  @IsOptional()
  @IsEnum(IntegrationPlatform)
  integrationPlatform?: IntegrationPlatform;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  integrationCode?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  customerId?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  userId?: number;
}
