import { MediaEntity } from '@app/core';
import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDto } from './page-meta.dto';
export class MediasPageDto {
  @ApiProperty({
    type: MediaEntity,
    isArray: true,
  })
  readonly data: MediaEntity[];

  @ApiProperty()
  readonly meta: any;

  constructor(data: MediaEntity[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
