import { CreateInstanceInput } from './create-instance.input';
import { InputType, PartialType } from '@nestjs/graphql';
import {
  IsUUID,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class UpdateInstanceInput extends PartialType(CreateInstanceInput) {
  @IsString()
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsBoolean()
  @IsOptional()
  isActived?: boolean;

  @IsString()
  @IsOptional()
  zApiId?: string;

  @IsString()
  @IsOptional()
  zApiToken?: string;

  @IsString()
  @IsOptional()
  webhookAfterSend?: string;

  @IsString()
  @IsOptional()
  webhookAfterDisconnect?: string;

  @IsString()
  @IsOptional()
  webhookAfterReceive?: string;

  @IsString()
  @IsOptional()
  ownerId?: string;
}
