import {
  CallBackPaymentVNRequest,
  PRODUCT_SERVICE_NAME,
  ProductServiceClient,
} from '@app/proto-schema/proto/product.pb';
import { Body, Controller, Get, Inject, Post, Req, Res } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Request, Response } from 'express';
import { firstValueFrom } from 'rxjs';

@Controller('payment')
export class AppController {
  private productService: ProductServiceClient;
  constructor(
    @Inject(PRODUCT_SERVICE_NAME) private readonly productClient: ClientGrpc,
  ) {
    this.productService =
      productClient.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME);
  }

  @Post('hook/zalo_url_ipn')
  async zaloUrlIpn(@Body() input: any, @Res() res: Response) {
    const { data, mac, type } = input;

    const { return_code, return_message } = await firstValueFrom(
      this.productService.callBackPaymentZaloProcess({ data, mac, type }),
    );
    return res.status(200).json({ return_code, return_message });
  }
  @Get('hook/vn_url_ipn')
  async urlIPN(@Req() req: Request, @Res() res: Response) {
    const {
      vnp_Amount,
      vnp_BankCode,
      vnp_BankTranNo,
      vnp_CardType,
      vnp_OrderInfo,
      vnp_PayDate,
      vnp_ResponseCode,
      vnp_TmnCode,
      vnp_TransactionNo,
      vnp_TransactionStatus,
      vnp_TxnRef,
      vnp_SecureHash,
    } = req.query;
    const { RspCode, Message } = await firstValueFrom(
      this.productService.callBackPaymentVNProcess({
        vnp_Amount,
        vnp_BankCode,
        vnp_BankTranNo,
        vnp_CardType,
        vnp_OrderInfo,
        vnp_PayDate,
        vnp_ResponseCode,
        vnp_TmnCode,
        vnp_TransactionNo,
        vnp_TransactionStatus,
        vnp_TxnRef,
        vnp_SecureHash,
      } as unknown as CallBackPaymentVNRequest),
    );
    return res.status(200).json({ RspCode, Message });
  }
}
