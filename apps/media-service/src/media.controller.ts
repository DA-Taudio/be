import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { MediaService } from './media.service';
import {
  ApiFile,
  AuthUser,
  MediaStatus,
  ParseFile,
  multerOptions,
} from '@app/core';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticationHttpGuard } from 'apps/gateway/src/auth/guards';
import { CreateMediaDto, PageOptionsDto } from './dtos';
import { parse } from 'path';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateSliderRequest,
  DeleteSliderRequest,
  GetManyMediaRequest,
  GetSliderRequest,
  ListSliderRequest,
  MEDIA_SERVICE_NAME,
  UpdateSliderRequest,
} from '@app/proto-schema/proto/media.pb';

@ApiTags('MEDIA<3')
@Controller('media')
@ApiBearerAuth()
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get('/')
  @UseGuards(AuthenticationHttpGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get media list',
  })
  async getMediaList(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: PageOptionsDto,
  ) {
    return this.mediaService.getMediaList(pageOptionsDto);
  }

  @Post('upload')
  @HttpCode(HttpStatus.OK)
  @ApiFile('file', true, multerOptions)
  async uploadMediaFile(
    @UploadedFile(ParseFile) file: Express.Multer.File,
    @AuthUser() userId: string,
  ) {
    const { filename, mimetype, originalname, path, size } = file;
    const data: CreateMediaDto = {
      userId,
      fileName: filename,
      name: await this.mediaService.createName(parse(originalname).name),
      mimeType: mimetype,
      size,
      duration: 0,
      url: path,
      status: MediaStatus.UPLOADED,
    };
    const media = await this.mediaService.createMedia(data);
    return media;
  }

  @GrpcMethod(MEDIA_SERVICE_NAME, 'GetManyMedia')
  async getMediaByIds(request: GetManyMediaRequest) {
    return await this.mediaService.getMediaByIds(request.ids);
  }
  @GrpcMethod(MEDIA_SERVICE_NAME, 'listSlider')
  async listSlider(request: ListSliderRequest) {
    return await this.mediaService.listSlider(request);
  }
  @GrpcMethod(MEDIA_SERVICE_NAME, 'getSlider')
  async getSlider(request: GetSliderRequest) {
    return await this.mediaService.getSlider(request);
  }
  @GrpcMethod(MEDIA_SERVICE_NAME, 'createSlider')
  async createSlider(request: CreateSliderRequest) {
    return await this.mediaService.createSlider(request);
  }
  @GrpcMethod(MEDIA_SERVICE_NAME, 'updateSlider')
  async updateSlider(request: UpdateSliderRequest) {
    return await this.mediaService.updateSlider(request);
  }
  @GrpcMethod(MEDIA_SERVICE_NAME, 'deleteSlider')
  async deleteSlider(request: DeleteSliderRequest) {
    return await this.mediaService.deleteSlider(request);
  }
}
