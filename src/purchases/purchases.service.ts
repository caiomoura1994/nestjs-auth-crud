import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePurchaseInput } from './dto/create-purchase.input';
import { UpdatePurchaseInput } from './dto/update-purchase.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { FindPaginatedInput, PaginatedItems } from 'src/common/graphql';

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

  async getCustomerPurchases(customerId: number): Promise<Purchase[]> {
    return this.purchaseRepository.find({ where: { customerId } });
  }

  findAllByUserId(userId: number) {
    return this.purchaseRepository.find({ where: { userId } });
  }

  async findPaginated({
    page = 1,
    perPage = 10,
    where = [],
  }: FindPaginatedInput<Purchase>): Promise<PaginatedItems<Purchase>> {
    const [items, totalItems] = await this.purchaseRepository.findAndCount({
      skip: (page - 1) * perPage,
      take: perPage,
      where,
    });

    const totalPages = Math.ceil(totalItems / perPage);
    return { items, totalItems, currentPage: page, totalPages };
  }

  getUserById(id: number) {
    return this.userRepository.findOne(id);
  }

  getCustomerById(id: number) {
    return this.customerRepository.findOne(id);
  }

  findOne(id: number) {
    return `This action returns a #${id} purchase`;
  }

  update(id: number, updatePurchaseInput: UpdatePurchaseInput) {
    return `This action updates a #${id} purchase`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchase`;
  }
}
