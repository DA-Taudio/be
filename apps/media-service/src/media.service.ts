import { Injectable } from '@nestjs/common';
import { MediaRepository, SliderRepository } from './media.repository';
import {
  CreateMediaDto,
  MediasPageDto,
  PageMetaDto,
  PageOptionsDto,
} from './dtos';
import { ForbiddenError } from 'apollo-server-express';
import { convertToObjectId } from '@app/utils';
import {
  CreateSliderRequest,
  DeleteSliderRequest,
  GetSliderRequest,
  ListSliderRequest,
  UpdateSliderRequest,
} from '@app/proto-schema/proto/media.pb';
import { RpcException } from '@nestjs/microservices';
import { FindNoSQL } from '@app/core';

@Injectable()
export class MediaService {
  constructor(
    private readonly _repository: MediaRepository,
    private readonly _sliderRepository: SliderRepository,
    private readonly find: FindNoSQL,
  ) {}

  /**
   *
   * @param pageOptionsDto
   * @returns
   */
  public async getMediaList(pageOptionsDto: PageOptionsDto) {
    const [medias, countMedias] = await this._repository.findAndCount({
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
      order: {
        createdAt: pageOptionsDto.order,
      },
    });

    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: countMedias,
    });

    return new MediasPageDto(medias, pageMetaDto);
  }

  /**
   * @param name
   * @returns
   */
  public async createName(name: string) {
    let index = 1;
    const baseName = name;
    while (await this.checkIfExistsName(name)) {
      name = baseName + '-' + index++;
    }
    return name;
  }

  /**
   * @param name
   */
  public async checkIfExistsName(name: string) {
    const count = await this._repository.count({
      name: name,
    });
    return count > 0 ? true : false;
  }

  /**
   *
   * @param createMediaDto
   */
  public async createMedia(input: CreateMediaDto) {
    try {
      const media = this._repository.create(input);
      await this._repository.save(media);
      return media;
    } catch (error) {
      throw new ForbiddenError(error);
    }
  }

  /**
   *
   * @param ids
   * @returns
   */
  public async getMediaByIds(ids: string[]) {
    try {
      const objectIds = ids.map((id) => {
        return convertToObjectId(id);
      });

      const media = await this._repository.find({
        where: {
          _id: { $in: objectIds },
        },
      });

      return { media };
    } catch (error) {
      throw new ForbiddenError(error);
    }
  }

  /**
   *
   * @param ListSliderRequest
   */
  public async listSlider(input: ListSliderRequest) {
    const { filter, pagination } = input;
    const { limit, page } = pagination;
    const offset = (page - 1) * limit;
    const where: any = {
      ...filter,
      deletedAt: null,
    };

    let orderBy = 'position_ASC';

    const option = this.find.getOption({
      limit,
      offset,
      where,
      orderBy,
    });

    const [data, totalCount] = await this._sliderRepository.findAndCount({
      ...option,
    });

    return {
      sliders: data || [],
      totalItem: totalCount,
      pagination: {
        currentPage: page,
        totalPage: Math.ceil(totalCount / limit),
        pageSize: limit,
      },
    };
  }
  /**
   *
   * @param GetSliderRequest
   */
  public async getSlider(input: GetSliderRequest) {
    const { sliderId } = input;
    const slider = await this._sliderRepository.findOne({
      where: {
        _id: convertToObjectId(sliderId),
        deletedAt: null,
      },
    });
    if (!slider) throw new RpcException('Không tìm thấy slider');
    return slider;
  }

  /**
   *
   * @param CreateSliderRequest
   */
  public async createSlider(input: CreateSliderRequest) {
    return await this._sliderRepository.save(input);
  }

  /**
   *
   * @param UpdateSliderRequest
   */
  public async updateSlider(input: UpdateSliderRequest) {
    const { sliderId, ...update } = input;
    const slider = await this._sliderRepository.findOne({
      where: {
        _id: convertToObjectId(sliderId),
        deletedAt: null,
      },
    });
    if (!slider) throw new RpcException('Không tìm thấy slider');

    if (update.position !== slider.position) {
      const isPositionIncrease = update.position > slider.position;
      const incrementValue = isPositionIncrease ? -1 : 1;

      const positionFilter = {
        deletedAt: null,
        position: isPositionIncrease
          ? { $gt: slider.position, $lte: update.position }
          : { $lt: slider.position, $gte: update.position },
      };

      await this._sliderRepository.updateMany(positionFilter, {
        $inc: { position: incrementValue },
      });
    }
    return await this._sliderRepository.findOneAndUpdate(
      { _id: sliderId },
      { $set: { ...update } },
      { returnOriginal: false },
    );
  }

  /**
   *
   * @param DeleteSliderRequest
   */
  public async deleteSlider(input: DeleteSliderRequest) {
    const { sliderId } = input;
    const slider = await this._sliderRepository.findOne({
      where: {
        _id: convertToObjectId(sliderId),
        deletedAt: null,
      },
    });
    if (!slider) throw new RpcException('Không tìm thấy slider');
    return await this._sliderRepository.softDeleteById(sliderId);
  }
}
