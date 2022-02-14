import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { InstancesService } from './instances.service';
import { Instance } from './entities/instance.entity';
import { CreateInstanceInput } from './dto/create-instance.input';
import { UpdateInstanceInput } from './dto/update-instance.input';
import { CurrentUser } from '../auth/userDecorator';
import { User } from '../users/user.entity';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(GqlAuthGuard)
@Resolver(() => Instance)
export class InstancesResolver {
  constructor(private readonly instancesService: InstancesService) {}

  @Mutation(() => Instance)
  createInstance(
    @Args('createInstanceInput') createInstanceInput: CreateInstanceInput,
  ) {
    return this.instancesService.create(createInstanceInput);
  }

  @Query(() => [Instance], { name: 'instances' })
  findAll(@CurrentUser() user: User) {
    console.log('user', user);
    console.log('user.id', user.id);
    if (!user) throw new UnauthorizedException('Invalid User');
    return this.instancesService.findAllByOwner(user.id);
  }

  @Query(() => Instance, { name: 'instance' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.instancesService.findOne(id);
  }

  @Mutation(() => Instance)
  updateInstance(
    @Args('updateInstanceInput') updateInstanceInput: UpdateInstanceInput,
  ) {
    return this.instancesService.update(
      updateInstanceInput.id,
      updateInstanceInput,
    );
  }

  @Mutation(() => Instance)
  removeInstance(@Args('id', { type: () => ID }) id: string) {
    return this.instancesService.remove(id);
  }
}
