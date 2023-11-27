import {
  ListSliderRequest,
  MEDIA_SERVICE_NAME,
  MediaServiceClient,
} from '@app/proto-schema/proto/media.pb';
import { Inject, UseGuards } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { AuthenticationGuard } from '../auth/guards';
import { BooleanPayload, MediaEntity } from '@app/core';
import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  CreateSliderInput,
  DeleteSliderInput,
  GetSliderInput,
  ListSliderInput,
  UpdateSliderInput,
} from './input';
import { ListSliderResponse, SliderResponse } from './type';
import { Media } from '../product/type';
import { IGraphQLContext } from '@app/core/interfaces';

@Resolver(() => SliderResponse)
export class SliderResolver {
  private mediaService: MediaServiceClient;

  constructor(
    @Inject(MEDIA_SERVICE_NAME) private readonly client: ClientGrpc,
  ) {}
  onModuleInit() {
    this.mediaService =
      this.client.getService<MediaServiceClient>(MEDIA_SERVICE_NAME);
  }

  // @UseGuards(AuthenticationGuard)
  @Mutation(() => SliderResponse)
  async createSlider(@Args('input') input: CreateSliderInput) {
    return await this.mediaService.createSlider(input);
  }

  // @UseGuards(AuthenticationGuard)
  @Mutation(() => BooleanPayload)
  async updateSlider(@Args('input') input: UpdateSliderInput) {
    return await this.mediaService.updateSlider(input);
  }

  // @UseGuards(AuthenticationGuard)
  @Mutation(() => BooleanPayload)
  async deleteSlider(@Args('input') input: DeleteSliderInput) {
    return await this.mediaService.deleteSlider(input);
  }

  // @UseGuards(AuthenticationGuard)
  @Query(() => SliderResponse)
  async getSlider(@Args('input') input: GetSliderInput) {
    return await this.mediaService.getSlider(input);
  }

  // @UseGuards(AuthenticationGuard)
  @Query(() => ListSliderResponse)
  async listSlider(@Args('input') input: ListSliderInput) {
    return await this.mediaService.listSlider(
      input as unknown as ListSliderRequest,
    );
  }
  @ResolveField('mediaId', () => Media, { nullable: true })
  async meida(
    @Parent() user: SliderResponse,
    @Context() { loaders }: IGraphQLContext,
  ) {
    if (user?.mediaId) {
      return loaders.mediaLoader.load(user?.mediaId);
    }
    return null;
  }
}
