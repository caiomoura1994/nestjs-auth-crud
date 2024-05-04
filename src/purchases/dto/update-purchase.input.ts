import { InputType, Field, ID } from '@nestjs/graphql';
import {
  IsOptional,
  IsString,
  IsUUID,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { IntegrationPlatform } from '../entities/purchase.entity';

@InputType()
export class UpdatePurchaseInput {
  @Field(() => ID)
  @IsUUID()
  id: string;

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
  @IsUUID()
  customerId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  userId?: string;
}
