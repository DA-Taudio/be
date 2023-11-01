import { GetListProductHandler } from './get-list-product.handler';
import { GetProductHandler } from './get-product.handler';
import { IsFavoriteProductHandler } from './is-favorite-product.handler';
import { ListCartHandler } from './list-cart.handler';
import { ListProductByIdsHandler } from './list-product-by-ids.handler';

export const ProductQueryHandlers = [
  GetListProductHandler,
  GetProductHandler,
  ListProductByIdsHandler,
  IsFavoriteProductHandler,
  ListCartHandler,
];
