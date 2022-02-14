import { InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateInstanceInput {
  @IsString()
  @IsNotEmpty()
  name: string;

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
  @IsNotEmpty()
  ownerId: string;
}
