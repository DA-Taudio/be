import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IsFavoriteProductQuery } from '../iml';
import { ProductFavoriteRepository } from '../../../product-favorite.repository';

@QueryHandler(IsFavoriteProductQuery)
export class IsFavoriteProductHandler
  implements IQueryHandler<IsFavoriteProductQuery>
{
  constructor(
    private readonly _productFavoriteRepository: ProductFavoriteRepository,
  ) {}

  async execute({ query, userId }: IsFavoriteProductQuery) {
    const { productId } = query;

    const favorite = await this._productFavoriteRepository.findOne({
      productId,
      userId,
    });

    return {
      success: favorite ? true : false,
    };
  }
}
