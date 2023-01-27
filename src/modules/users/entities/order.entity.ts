import { Product } from '../../products/entities';
import { User } from './user.entity';

export class Order {
  date: Date;
  user: User;
  products: Product[];
}
