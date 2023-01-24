import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User } from './user.entity';
import { InstancesModule } from '../instances/instances.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), InstancesModule],
  providers: [UserService, UserResolver],
})
export class UserModule {}
