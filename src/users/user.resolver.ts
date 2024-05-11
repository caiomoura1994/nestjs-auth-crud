import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';

import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/jwt-auth.guard';
import { UserOutput } from './dto/user.output';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserOutput)
  async createUser(@Args('data') data: CreateUserInput): Promise<UserOutput> {
    return this.userService.createUser(data);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => UserOutput)
  async me(@Context() context): Promise<UserOutput> {
    const { user } = context.req;
    if (!user) {
      throw new Error('Usuário não autenticado');
    }
    return this.userService.getUserById(user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => UserOutput)
  async user(@Args('id') id: number): Promise<UserOutput> {
    return this.userService.getUserById(id);
  }

  @Query(() => UserOutput)
  async userByEmail(@Args('email') email: string): Promise<UserOutput> {
    return this.userService.getUserByEmail(email);
  }

  @Query(() => [UserOutput])
  async users(): Promise<UserOutput[]> {
    return await this.userService.findAllUsers();
  }

  @Mutation(() => UserOutput)
  async updateUser(
    @Args('id') id: number,
    @Args('data') data: UpdateUserInput,
  ): Promise<UserOutput> {
    return this.userService.updateUser({ id, ...data });
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: number): Promise<true> {
    await this.userService.deleteUser(id);
    return true;
  }
}
