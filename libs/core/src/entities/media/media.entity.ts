import { Column, Entity, Unique } from 'typeorm';
import { BaseNoSQLEntity } from '../base';
import { registerEnumType } from '@nestjs/graphql';

export enum MediaStatus {
  UPLOADING = 'UPLOADING',
  UPLOADED = 'UPLOADED',
}

registerEnumType(MediaStatus, { name: 'MediaStatus' });

@Entity({ name: 'media_files' })
export class MediaEntity extends BaseNoSQLEntity {
  @Column({
    type: 'string',
  })
  userId: string;

  @Unique(['name'])
  @Column({
    type: 'string',
  })
  name: string;

  @Column({
    type: 'string',
  })
  fileName: string;

  @Column({
    type: 'string',
  })
  mimetype: string;

  @Column({
    type: 'number',
  })
  size: number;

  @Column({
    type: 'number',
  })
  duration: number;

  @Column({
    type: 'string',
  })
  url: string;

  @Column('enum', { enum: MediaStatus })
  status: MediaStatus;
}
