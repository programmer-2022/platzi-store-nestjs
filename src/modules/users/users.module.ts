import { Module } from '@nestjs/common';
import { ProductsModule } from '../products';
import { CustomerController, UsersController } from './controllers';
import { CustomersService, UsersService } from './services';

Module({
  imports: [ProductsModule],
  controllers: [CustomerController, UsersController],
  providers: [CustomersService, UsersService],
});

export class UsersModule {}
