import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PurchasesService } from './purchases.service';
import { CreatePurchaseInput } from './dto/create-purchase.input';
import { UpdatePurchaseInput } from './dto/update-purchase.input';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { PurchaseOutput } from './dto/purchase.output';
import { UserOutput } from 'src/users/dto/user.output';
import { CustomerOutput } from 'src/customers/dto/customer.output';

@Resolver(() => PurchaseOutput)
export class PurchasesResolver {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Mutation(() => PurchaseOutput)
  createPurchase(
    @Args('createPurchaseInput') createPurchaseInput: CreatePurchaseInput,
  ) {
    return this.purchasesService.create(createPurchaseInput);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [PurchaseOutput], { name: 'purchases' })
  findAll(@Context() context) {
    const { user } = context.req;
    return this.purchasesService.findAllByUserId(user.id);
  }

  @Query(() => PurchaseOutput, { name: 'purchase' })
  findOne(@Args('id', { type: () => Int }) id: string) {
    return this.purchasesService.findOne(id);
  }

  @ResolveField('user', () => UserOutput)
  async getUser(@Parent() purchase: PurchaseOutput) {
    return this.purchasesService.getUserById(purchase.userId);
  }

  @ResolveField('customer', () => CustomerOutput)
  async getCustomer(@Parent() purchase: PurchaseOutput) {
    return this.purchasesService.getCustomerById(purchase.customerId);
  }

  @Mutation(() => PurchaseOutput)
  updatePurchase(
    @Args('updatePurchaseInput') updatePurchaseInput: UpdatePurchaseInput,
  ) {
    return this.purchasesService.update(
      updatePurchaseInput.id,
      updatePurchaseInput,
    );
  }

  @Mutation(() => PurchaseOutput)
  removePurchase(@Args('id', { type: () => Int }) id: string) {
    return this.purchasesService.remove(id);
  }
}
