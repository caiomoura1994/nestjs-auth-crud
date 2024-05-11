import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CustomersService } from './customers.service';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { CustomerOutput } from './dto/customer.output';
import { User } from 'src/users/user.entity';

@Resolver(() => CustomerOutput)
export class CustomersResolver {
  constructor(private readonly customersService: CustomersService) {}

  @Mutation(() => CustomerOutput)
  createCustomer(
    @Args('createCustomerInput') createCustomerInput: CreateCustomerInput,
  ) {
    return this.customersService.create(createCustomerInput);
  }

  @Query(() => [CustomerOutput], { name: 'customers' })
  findAll() {
    return this.customersService.findAll();
  }

  @Query(() => CustomerOutput, { name: 'customer' })
  async findOne(@Args('id', { type: () => ID }) id: number) {
    const customer = await this.customersService.findOne(id);
    if (!customer) {
      throw new Error('Cliente não encontrado');
    }
    return customer;
  }

  @ResolveField('user', () => User)
  async getUser(@Parent() customer: CustomerOutput) {
    return this.customersService.getUserById(customer.userId);
  }

  @Mutation(() => CustomerOutput)
  updateCustomer(
    @Args('updateCustomerInput') updateCustomerInput: UpdateCustomerInput,
  ) {
    return this.customersService.update(updateCustomerInput);
  }

  @Mutation(() => CustomerOutput)
  removeCustomer(@Args('id', { type: () => ID }) id: number) {
    return this.customersService.remove(id);
  }
}
