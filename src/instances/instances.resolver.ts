import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { InstancesService } from './instances.service';
import { Instance } from './entities/instance.entity';
import { CreateInstanceInput } from './dto/create-instance.input';
import { UpdateInstanceInput } from './dto/update-instance.input';
import { CurrentUser } from '../auth/userDecorator';
import { User } from '../users/user.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(GqlAuthGuard)
@Resolver(() => Instance)
export class InstancesResolver {
  constructor(private readonly instancesService: InstancesService) {}

  @Mutation(() => Instance)
  createInstance(
    @CurrentUser() user: User,
    @Args('createInstanceInput') createInstanceInput: CreateInstanceInput,
  ) {
    const ownerId = user?.id;
    return this.instancesService.create({ ...createInstanceInput, ownerId });
  }

  @Query(() => [Instance], { name: 'instances' })
  findAll(@CurrentUser() user: User) {
    return this.instancesService.findAllByOwner(user.id);
  }

  @Query(() => Instance, { name: 'instance' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.instancesService.findOne(id);
  }

  @Mutation(() => Instance)
  updateInstance(
    @CurrentUser() user: User,
    @Args('updateInstanceInput') updateInstanceInput: UpdateInstanceInput,
  ) {
    const ownerId = user?.id;
    return this.instancesService.update(updateInstanceInput.id, {
      ...updateInstanceInput,
      ownerId,
    });
  }

  @Mutation(() => Instance)
  removeInstance(@Args('id', { type: () => ID }) id: string) {
    return this.instancesService.remove(id);
  }

  @ResolveField(() => User)
  async owner(@Parent() instance: Instance) {
    return instance.owner ? instance.owner : [];
  }
}
