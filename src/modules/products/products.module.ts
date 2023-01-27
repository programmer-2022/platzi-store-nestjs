import { Module } from '@nestjs/common';

import {
  BrandsController,
  CategoriesController,
  ProductsController,
} from './controllers';
import { BrandsService, CategoriesService, ProductsService } from './services';

@Module({
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [ProductsService, BrandsService, CategoriesService],
  exports: [ProductsService],
})
export class ProductsModule {}
