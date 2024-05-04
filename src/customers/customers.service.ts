import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createCustomerInput: CreateCustomerInput) {
    const customerAlreadyExists = await this.customerRepository.findOne({
      where: { email: createCustomerInput.email },
    });
    if (customerAlreadyExists)
      throw new HttpException('Cliente já cadastrado', HttpStatus.BAD_REQUEST);
    const customer = this.customerRepository.create(createCustomerInput);
    return this.customerRepository.save(customer);
  }

  findAll() {
    return this.customerRepository.find();
  }

  getUserById(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  findOne(id: string) {
    return this.customerRepository.findOne(id);
  }

  async update(updateCustomerInput: UpdateCustomerInput) {
    const customerNotFound = await this.customerRepository.findOne({
      where: { id: updateCustomerInput.id },
    });
    if (customerNotFound)
      throw new HttpException('Cliente não encontrado', HttpStatus.BAD_REQUEST);

    const customer = await this.findOne(updateCustomerInput?.id);
    return this.customerRepository.save({
      ...customer,
      ...updateCustomerInput,
    });
  }

  remove(id: string) {
    return this.customerRepository.softDelete(id);
  }
}
