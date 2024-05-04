import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, IsUUID } from 'class-validator';

@InputType()
export class UpdateCustomerInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsUUID()
  id?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;
}
