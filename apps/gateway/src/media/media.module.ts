import { Module } from '@nestjs/common';
import { SliderResolver } from './slider.resolver';

@Module({
  providers: [SliderResolver],
})
export class MediaModule {}
