import { registerEnumType } from '@nestjs/graphql';

export enum SliderType {
  VIDEO = 'VIDEO',
  IMAGE = 'IMAGE',
}
registerEnumType(SliderType, { name: 'SliderType' });
