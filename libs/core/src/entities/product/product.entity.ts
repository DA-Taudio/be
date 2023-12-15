import { Field, ObjectType } from '@nestjs/graphql';
import { Expose, plainToClass } from 'class-transformer';
import { Column, Entity } from 'typeorm';
import { BaseNoSQLEntity } from '../base';

@Entity('db_product')
@ObjectType()
export class ProductEntity extends BaseNoSQLEntity {
  @Column()
  @Expose()
  @Field()
  name: string;

  @Column()
  @Expose()
  @Field()
  description?: string;

  @Column()
  @Expose()
  @Field()
  price: number;

  @Column({ default: 0 })
  @Expose()
  @Field()
  countInStock: number = 0;

  @Column()
  @Expose()
  @Field(() => String)
  image: string;

  @Column()
  @Expose()
  @Field(() => String)
  specification?: string;

  @Column({ default: 0 })
  @Expose()
  @Field()
  totalLike?: number = 0;

  @Column({ default: 0 })
  @Expose()
  @Field()
  totalComment?: number = 0;

  @Column()
  @Expose()
  @Field()
  type: string;

  @Column({ default: 0 })
  @Expose()
  @Field()
  totalSold?: number = 0;
  constructor(product: Partial<ProductEntity>) {
    super();
    Object.assign(
      this,
      plainToClass(ProductEntity, product, {
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
        exposeUnsetFields: false,
      }),
    );
  }
}
