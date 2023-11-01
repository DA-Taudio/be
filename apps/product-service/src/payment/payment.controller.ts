import { AppMetadata } from '@app/core';
import {
  CallBackPaymentVNRequest,
  CallBackPaymentVNResponse,
  CallBackPaymentZaloRequest,
  CallBackPaymentZaloResponse,
  ConfirmOrderResponse,
  ConfirmOrderResquest,
  CreatePaymentRequest,
  CreatePaymentResponse,
  DetailOrderRequest,
  ListOrderAdminRequest,
  ListOrderResponse,
  ListOrderUserRequest,
  OrderDto,
  PRODUCT_SERVICE_NAME,
} from '@app/proto-schema/proto/product.pb';
import { Metadata } from '@grpc/grpc-js';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import { ConfirmOrderCommand, CreatePaymentCommand } from './cqrs/command/iml';
import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ZaloPayService } from './zalopay.service';
import { Request, Response } from 'express';
import * as requestIp from 'request-ip';
import { VNPayService } from './vnpay.service';
import { ListOrderAdminQuery, ListOrderUserQuery } from './cqrs/query';
import { DetailOrderQuery } from './cqrs/query/iml/detail-order.query';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,

    private readonly appMetadata: AppMetadata,
    private readonly _zaloPayService: ZaloPayService,
    private readonly _vnpayService: VNPayService,
  ) {}

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'CreatePayment')
  async createPayment(
    request: CreatePaymentRequest,
    metadata: Metadata,
  ): Promise<CreatePaymentResponse> {
    return await this.commandBus.execute(
      new CreatePaymentCommand(request, this.appMetadata.getUserId(metadata)),
    );
  }

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'listOrderUser')
  async listOrderUser(
    request: ListOrderUserRequest,
    metadata: Metadata,
  ): Promise<ListOrderResponse> {
    return await this.queryBus.execute(
      new ListOrderUserQuery(request, this.appMetadata.getUserId(metadata)),
    );
  }
  @GrpcMethod(PRODUCT_SERVICE_NAME, 'listOrderAdmin')
  async listOrderAdmin(
    request: ListOrderAdminRequest,
  ): Promise<ListOrderResponse> {
    return await this.queryBus.execute(new ListOrderAdminQuery(request));
  }

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'ConfirmOrder')
  async confirmOrder(
    request: ConfirmOrderResquest,
  ): Promise<ConfirmOrderResponse> {
    return await this.commandBus.execute(new ConfirmOrderCommand(request));
  }

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'DetailOrder')
  async detailOrder(request: DetailOrderRequest): Promise<OrderDto> {
    return await this.queryBus.execute(new DetailOrderQuery(request));
  }

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'callBackPaymentZaloProcess')
  async callBackPaymentZaloProcess(
    input: CallBackPaymentZaloRequest,
  ): Promise<CallBackPaymentZaloResponse> {
    const { data, mac, type } = input;

    return await this._zaloPayService.callBackPaymentProcess({
      data,
      mac,
      type,
    });
  }

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'callBackPaymentVNProcess')
  async callBackPaymentVNProcess(
    input: CallBackPaymentVNRequest,
  ): Promise<CallBackPaymentVNResponse> {
    return await this._vnpayService.callBackPaymentProcess({
      ...input,
    });
  }

  // @Post('hook/zalo_url_ipn')
  // async zaloUrlIpn(@Body() input: any, @Res() res: Response) {
  //   const { data, mac, type } = input;
  //   const { return_code, return_message } =
  //     await this._zaloPayService.callBackPaymentProcess({ data, mac, type });
  //   return res.status(200).json({ return_code, return_message });
  // }

  // @Get('hook/url_ipn')
  // async urlIPN(@Req() req: Request, @Res() res: Response) {
  //   const ip = requestIp.getClientIp(req);
  //   const { RspCode, Message } =
  //     await this._vnpayService.callBackPaymentProcess(req.query);
  //   return res.status(200).json({ RspCode, Message });
  // }
}
