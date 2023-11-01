import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CartRepository } from '../../../cart.repository';
import { ListCartResponse } from '@app/proto-schema/proto/product.pb';
import { ListCartQuery } from '../iml';

@QueryHandler(ListCartQuery)
export class ListCartHandler implements IQueryHandler<ListCartQuery> {
  constructor(private readonly _cartRepository: CartRepository) {}
  async execute({ query, userId }: ListCartQuery): Promise<ListCartResponse> {
    const [data, totalItem] =
      await this._cartRepository.findAllAndCountWithoutDeletedAt({
        where: {
          userId,
        },
      });
    return { cart: data } as ListCartResponse;
  }
}
