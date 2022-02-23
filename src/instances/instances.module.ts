import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InstancesService } from './instances.service';
import { InstancesResolver } from './instances.resolver';
import { Instance } from './entities/instance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Instance])],
  providers: [InstancesResolver, InstancesService],
  exports: [InstancesService],
})
export class InstancesModule {}
