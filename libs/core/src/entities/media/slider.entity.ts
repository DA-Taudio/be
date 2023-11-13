import { Column, Entity } from 'typeorm';
import { BaseNoSQLEntity } from '../base';
export enum SliderType {
  VIDEO = 'VIDEO',
  IMAGE = 'IMAGE',
}

@Entity({ name: 'db_slider' })
export class SliderEntity extends BaseNoSQLEntity {
  @Column({
    type: 'string',
  })
  mediaId: string;

  @Column({
    type: 'number',
  })
  position: number;

  @Column('enum', { enum: SliderType })
  type: SliderType;

  @Column({
    type: 'string',
  })
  redirectUrl: string;
}
