import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePurchaseInput } from './dto/create-purchase.input';
import { UpdatePurchaseInput } from './dto/update-purchase.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Customer } from 'src/customers/entities/customer.entity';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}
  async create(input: CreatePurchaseInput) {
    const purchaseAlreadyExists = await this.purchaseRepository.findOne({
      where: { code: input.code },
    });
    if (purchaseAlreadyExists)
      throw new HttpException('Compra já foi criada', HttpStatus.BAD_REQUEST);
    const purchase = this.purchaseRepository.create(input);
    return this.purchaseRepository.save(purchase);
  }

  async getCustomerPurchases(customerId: string): Promise<Purchase[]> {
    return this.purchaseRepository.find({ where: { customerId } });
  }

  findAllByUserId(userId: string) {
    return this.purchaseRepository.find({ where: { userId } });
  }

  getUserById(id: string) {
    return this.userRepository.findOne(id);
  }

  getCustomerById(id: string) {
    return this.customerRepository.findOne(id);
  }

  findOne(id: string) {
    return `This action returns a #${id} purchase`;
  }

  update(id: string, updatePurchaseInput: UpdatePurchaseInput) {
    return `This action updates a #${id} purchase`;
  }

  remove(id: string) {
    return `This action removes a #${id} purchase`;
  }
}
