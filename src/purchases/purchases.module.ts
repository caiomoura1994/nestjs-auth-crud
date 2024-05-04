import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesResolver } from './purchases.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase, Customer, User])],
  providers: [PurchasesResolver, PurchasesService],
})
export class PurchasesModule {}
