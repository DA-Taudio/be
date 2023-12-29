import { AddToCartHandler } from './add-to-cart.handler';
import { AnalyticHandler } from '../../query/handler/analytic.handler';
import { ClearCartHandler } from './clear-cart.handler';
import { CreateProductHandler } from './create-product.handler';
import { DeleteProductHandler } from './delete-product.handler';
import { FavoriteProductHandler } from './favorite-product.handler';
import { RemoveFromCartHandler } from './remove-from-cart.handler';
import { UpdateProductHandler } from './update-product.handler';

export const ProductCommandHandlers = [
  CreateProductHandler,
  UpdateProductHandler,
  DeleteProductHandler,
  FavoriteProductHandler,
  AddToCartHandler,
  RemoveFromCartHandler,
  ClearCartHandler,
];
