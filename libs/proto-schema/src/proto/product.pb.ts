/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import {
  SortDirection,
  PaginationInput,
  PaginationResponse,
  BooleanPayload,
} from './base.pb';
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

export const protobufPackage = 'product';

export enum PaymentMethod {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

export enum PaymentType {
  ATM = 'ATM',
  CC = 'CC',
}

export enum PaymentProvider {
  ZALOPAY = 'ZALOPAY',
  VNPAY = 'VNPAY',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  FAILED = 'FAILED',
  COMPLETED = 'COMPLETED',
}

export enum ShippingStatus {
  SHIPPED = 'SHIPPED',
  SHIPPING = 'SHIPPING',
  NOT_SHIPPED = 'NOT_SHIPPED',
}

export enum VoucherStatus {
  UPCOMING = 'UPCOMING',
  EXPIRED = 'EXPIRED',
  APPLYING = 'APPLYING',
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  countInStock: number;
  image: string;
  video: string;
  manufacturer: string;
  modelNumber: string;
  dimensions: string;
  weight: string;
  connectivity: string;
  powerSource: string;
  compatibility: string;
  warranty: string;
  type: string;
}

export interface CreateProductResponse {
  success: boolean;
}

export interface GetProductRequest {
  productId: string;
}

export interface GetProductResponse {
  product: Product | undefined;
}

export interface FilterList {
  price_lte: number;
  price_gte: number;
  type_eq: string;
  status_eq: VoucherStatus;
}

export interface SortList {
  createdAt: SortDirection;
}

export interface GetListProductRequest {
  query: string;
  filter: FilterList | undefined;
  pagination: PaginationInput | undefined;
  sort: SortList | undefined;
}

export interface GetListProductResponse {
  products: Product[];
  pagination: PaginationResponse | undefined;
  totalItem: number;
}

export interface UpdateProductRequest {
  updateInput: ProductRequest | undefined;
  productId: string;
}

export interface UpdateProductResponse {
  success: boolean;
}

export interface DeleteProductRequest {
  productId: string;
}

export interface DeleteProductResponse {
  success: boolean;
}

export interface ProductRequest {
  name: string;
  description: string;
  price: number;
  countInStock: number;
  image: string;
  video: string;
  manufacturer: string;
  modelNumber: string;
  dimensions: string;
  weight: string;
  connectivity: string;
  powerSource: string;
  compatibility: string;
  warranty: string;
  type: string;
}

export interface Product {
  name: string;
  description: string;
  price: number;
  countInStock: number;
  image: string;
  video: string;
  manufacturer: string;
  modelNumber: string;
  dimensions: string;
  weight: string;
  connectivity: string;
  powerSource: string;
  compatibility: string;
  warranty: string;
  totalLike: number;
  totalComment: number;
  _id: string;
  type: string;
  totalSold: number;
  /** base */
  createdAt: number;
  createdBy: number;
  updatedAt: number;
  updatedBy: number;
  deletedBy: string;
  deletedAt: number;
}

/** Payment */
export interface OrderItem {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

export interface CreatePaymentRequest {
  code: string;
  description: string;
  couponCode: string;
  items: OrderItem[];
  paymentMethod: PaymentMethod;
  paymentType: PaymentType;
  paymentProvider: PaymentProvider;
  shippingAddress: string;
}

export interface CreatePaymentResponse {
  redirectUrl?: string | undefined;
  success?: boolean | undefined;
}

export interface CreateCommentRequest {
  message: string;
  productId: string;
  parentId: string;
}

export interface CreateCommentResponse {
  message: string;
  productId: string;
  parentId: string;
  _id: string;
  userId: string;
  countFeedback: number;
  /** base */
  createdAt: number;
  createdBy: number;
  updatedAt: number;
  updatedBy: number;
  deletedBy: string;
  deletedAt: number;
}

export interface ProductType {
  name: string;
  _id: string;
}

export interface ListTypeResponse {
  data: ProductType[];
}

export interface ListTypeRequest {}

export interface ListCommentRequest {
  id: string;
}

export interface OrderTransaction {
  gateway: string;
  id: string;
  time: number;
}

export interface OrderDto {
  _id: string;
  code: string;
  status: OrderStatus;
  amount: number;
  description: string;
  couponCode: string;
  discountAmount: number;
  subTotal: number;
  userId: string;
  paymentMethod: PaymentMethod;
  transaction: OrderTransaction | undefined;
  items: OrderItem[];
  shippingStatus: ShippingStatus;
  shippingAddress: string;
  /** base */
  createdAt: number;
  createdBy: number;
  updatedAt: number;
  updatedBy: number;
  deletedBy: string;
  deletedAt: number;
}

export interface ListCommentResponse {
  data: CreateCommentResponse[];
}

export interface ListOrderUserRequest {}

export interface ListOrderAdminRequest {}

export interface ListOrderResponse {
  orders: OrderDto[];
}

export interface ListProductByIdsRequest {
  ids: string[];
}

export interface ListProductByIdsResponse {
  data: Product[];
}

export interface CallBackPaymentZaloRequest {
  data: string;
  mac: string;
  type: number;
}

export interface CallBackPaymentZaloResponse {
  return_code: number;
  return_message: string;
}

export interface CallBackPaymentVNRequest {
  vnp_Amount: string;
  vnp_BankCode: string;
  vnp_BankTranNo: string;
  vnp_CardType: string;
  vnp_OrderInfo: string;
  vnp_PayDate: string;
  vnp_ResponseCode: string;
  vnp_TmnCode: string;
  vnp_TransactionNo: string;
  vnp_TransactionStatus: string;
  vnp_TxnRef: string;
  vnp_SecureHash: string;
}

export interface CallBackPaymentVNResponse {
  RspCode: string;
  Message: string;
}

export interface FavoriteProductRequest {
  productId: string;
}

export interface IsFavoriteProductRequest {
  productId: string;
}

export interface ConfirmOrderResquest {
  orderId: string;
}

export interface ConfirmOrderResponse {
  success: boolean;
}

export interface DetailOrderRequest {
  orderId: string;
}

export interface DeleteTypeRequest {
  typeId: string;
}

export interface DeleteTypeResponse {
  success: boolean;
}

export interface CartResponse {
  _id: string;
  quantity: number;
  userId: string;
  productId: string;
  status: boolean;
  price: number;
  /** base */
  createdAt: number;
  createdBy: number;
  updatedAt: number;
  updatedBy: number;
  deletedBy: string;
  deletedAt: number;
}

export interface AddToCartRequest {
  quantity: number;
  productId: string;
}

export interface AddToCartResponse {
  success: boolean;
}

export interface RemoveFromCartRequest {
  _id: string;
}

export interface RemoveFromCartResponse {
  success: boolean;
}

export interface ListCartRequest {}

export interface ListCartResponse {
  cart: CartResponse[];
}

export interface ClearCartRequest {}

export interface ListFeedbackRequest {
  parentId: string;
}

export interface VoucherResponse {
  code: string;
  percent: number;
  maxDiscount: number;
  quantity: number;
  maxUserUse: number;
  productIds: string[];
  startTime: number;
  endTime: number;
  /** base */
  createdAt: number;
  createdBy: number;
  updatedAt: number;
  updatedBy: number;
  deletedBy: string;
  deletedAt: number;
}

export interface CreateVoucherRequest {
  code: string;
  percent: number;
  maxDiscount: number;
  quantity: number;
  maxUserUse: number;
  productIds: string[];
  startTime: number;
  endTime: number;
}

export interface UpdateVoucherRequest {
  _id: string;
  code: string;
  percent: number;
  maxDiscount: number;
  quantity: number;
  maxUserUse: number;
  productIds: string[];
  startTime: number;
  endTime: number;
}

export interface GetVoucherRequest {
  _id: string;
}

export interface DeleteVoucherRequest {
  _id: string;
}

export interface ListVoucherRequest {
  query: string;
  filter: FilterList | undefined;
  pagination: PaginationInput | undefined;
}

export interface ListVoucherResponse {
  vouchers: VoucherResponse[];
  pagination: PaginationResponse | undefined;
  totalItem: number;
}

export const PRODUCT_PACKAGE_NAME = 'product';

export interface ProductServiceClient {
  /** product */

  createProduct(
    request: CreateProductRequest,
    metadata?: Metadata,
  ): Observable<CreateProductResponse>;

  getProduct(
    request: GetProductRequest,
    metadata?: Metadata,
  ): Observable<GetProductResponse>;

  getListProduct(
    request: GetListProductRequest,
    metadata?: Metadata,
  ): Observable<GetListProductResponse>;

  updateProduct(
    request: UpdateProductRequest,
    metadata?: Metadata,
  ): Observable<UpdateProductResponse>;

  deleteProduct(
    request: DeleteProductRequest,
    metadata?: Metadata,
  ): Observable<DeleteProductResponse>;

  listProductByIds(
    request: ListProductByIdsRequest,
    metadata?: Metadata,
  ): Observable<ListProductByIdsResponse>;

  isFavoriteProduct(
    request: IsFavoriteProductRequest,
    metadata?: Metadata,
  ): Observable<BooleanPayload>;

  favoriteProduct(
    request: FavoriteProductRequest,
    metadata?: Metadata,
  ): Observable<BooleanPayload>;

  /** payment */

  createPayment(
    request: CreatePaymentRequest,
    metadata?: Metadata,
  ): Observable<CreatePaymentResponse>;

  callBackPaymentZaloProcess(
    request: CallBackPaymentZaloRequest,
    metadata?: Metadata,
  ): Observable<CallBackPaymentZaloResponse>;

  callBackPaymentVNProcess(
    request: CallBackPaymentVNRequest,
    metadata?: Metadata,
  ): Observable<CallBackPaymentVNResponse>;

  /** Comment */

  createComment(
    request: CreateCommentRequest,
    metadata?: Metadata,
  ): Observable<CreateCommentResponse>;

  listComment(
    request: ListCommentRequest,
    metadata?: Metadata,
  ): Observable<ListCommentResponse>;

  listFeedback(
    request: ListFeedbackRequest,
    metadata?: Metadata,
  ): Observable<ListCommentResponse>;

  /** Type */

  createType(
    request: ProductType,
    metadata?: Metadata,
  ): Observable<CreateProductResponse>;

  listType(
    request: ListTypeRequest,
    metadata?: Metadata,
  ): Observable<ListTypeResponse>;

  deleteType(
    request: DeleteTypeRequest,
    metadata?: Metadata,
  ): Observable<DeleteTypeResponse>;

  /** cart */

  listOrderUser(
    request: ListOrderUserRequest,
    metadata?: Metadata,
  ): Observable<ListOrderResponse>;

  listOrderAdmin(
    request: ListOrderAdminRequest,
    metadata?: Metadata,
  ): Observable<ListOrderResponse>;

  detailOrder(
    request: DetailOrderRequest,
    metadata?: Metadata,
  ): Observable<OrderDto>;

  confirmOrder(
    request: ConfirmOrderResquest,
    metadata?: Metadata,
  ): Observable<ConfirmOrderResponse>;

  addToCart(
    request: AddToCartRequest,
    metadata?: Metadata,
  ): Observable<AddToCartResponse>;

  removeFromCart(
    request: RemoveFromCartRequest,
    metadata?: Metadata,
  ): Observable<RemoveFromCartResponse>;

  listCart(
    request: ListCartRequest,
    metadata?: Metadata,
  ): Observable<ListCartResponse>;

  clearCart(
    request: ClearCartRequest,
    metadata?: Metadata,
  ): Observable<RemoveFromCartResponse>;

  /** voucher */

  createVoucher(
    request: CreateVoucherRequest,
    metadata?: Metadata,
  ): Observable<VoucherResponse>;

  updateVoucher(
    request: UpdateVoucherRequest,
    metadata?: Metadata,
  ): Observable<BooleanPayload>;

  deleteVoucher(
    request: DeleteVoucherRequest,
    metadata?: Metadata,
  ): Observable<BooleanPayload>;

  getVoucher(
    request: GetVoucherRequest,
    metadata?: Metadata,
  ): Observable<VoucherResponse>;

  listVoucher(
    request: ListVoucherRequest,
    metadata?: Metadata,
  ): Observable<ListVoucherResponse>;
}

export interface ProductServiceController {
  /** product */

  createProduct(
    request: CreateProductRequest,
    metadata?: Metadata,
  ):
    | Promise<CreateProductResponse>
    | Observable<CreateProductResponse>
    | CreateProductResponse;

  getProduct(
    request: GetProductRequest,
    metadata?: Metadata,
  ):
    | Promise<GetProductResponse>
    | Observable<GetProductResponse>
    | GetProductResponse;

  getListProduct(
    request: GetListProductRequest,
    metadata?: Metadata,
  ):
    | Promise<GetListProductResponse>
    | Observable<GetListProductResponse>
    | GetListProductResponse;

  updateProduct(
    request: UpdateProductRequest,
    metadata?: Metadata,
  ):
    | Promise<UpdateProductResponse>
    | Observable<UpdateProductResponse>
    | UpdateProductResponse;

  deleteProduct(
    request: DeleteProductRequest,
    metadata?: Metadata,
  ):
    | Promise<DeleteProductResponse>
    | Observable<DeleteProductResponse>
    | DeleteProductResponse;

  listProductByIds(
    request: ListProductByIdsRequest,
    metadata?: Metadata,
  ):
    | Promise<ListProductByIdsResponse>
    | Observable<ListProductByIdsResponse>
    | ListProductByIdsResponse;

  isFavoriteProduct(
    request: IsFavoriteProductRequest,
    metadata?: Metadata,
  ): Promise<BooleanPayload> | Observable<BooleanPayload> | BooleanPayload;

  favoriteProduct(
    request: FavoriteProductRequest,
    metadata?: Metadata,
  ): Promise<BooleanPayload> | Observable<BooleanPayload> | BooleanPayload;

  /** payment */

  createPayment(
    request: CreatePaymentRequest,
    metadata?: Metadata,
  ):
    | Promise<CreatePaymentResponse>
    | Observable<CreatePaymentResponse>
    | CreatePaymentResponse;

  callBackPaymentZaloProcess(
    request: CallBackPaymentZaloRequest,
    metadata?: Metadata,
  ):
    | Promise<CallBackPaymentZaloResponse>
    | Observable<CallBackPaymentZaloResponse>
    | CallBackPaymentZaloResponse;

  callBackPaymentVNProcess(
    request: CallBackPaymentVNRequest,
    metadata?: Metadata,
  ):
    | Promise<CallBackPaymentVNResponse>
    | Observable<CallBackPaymentVNResponse>
    | CallBackPaymentVNResponse;

  /** Comment */

  createComment(
    request: CreateCommentRequest,
    metadata?: Metadata,
  ):
    | Promise<CreateCommentResponse>
    | Observable<CreateCommentResponse>
    | CreateCommentResponse;

  listComment(
    request: ListCommentRequest,
    metadata?: Metadata,
  ):
    | Promise<ListCommentResponse>
    | Observable<ListCommentResponse>
    | ListCommentResponse;

  listFeedback(
    request: ListFeedbackRequest,
    metadata?: Metadata,
  ):
    | Promise<ListCommentResponse>
    | Observable<ListCommentResponse>
    | ListCommentResponse;

  /** Type */

  createType(
    request: ProductType,
    metadata?: Metadata,
  ):
    | Promise<CreateProductResponse>
    | Observable<CreateProductResponse>
    | CreateProductResponse;

  listType(
    request: ListTypeRequest,
    metadata?: Metadata,
  ):
    | Promise<ListTypeResponse>
    | Observable<ListTypeResponse>
    | ListTypeResponse;

  deleteType(
    request: DeleteTypeRequest,
    metadata?: Metadata,
  ):
    | Promise<DeleteTypeResponse>
    | Observable<DeleteTypeResponse>
    | DeleteTypeResponse;

  /** cart */

  listOrderUser(
    request: ListOrderUserRequest,
    metadata?: Metadata,
  ):
    | Promise<ListOrderResponse>
    | Observable<ListOrderResponse>
    | ListOrderResponse;

  listOrderAdmin(
    request: ListOrderAdminRequest,
    metadata?: Metadata,
  ):
    | Promise<ListOrderResponse>
    | Observable<ListOrderResponse>
    | ListOrderResponse;

  detailOrder(
    request: DetailOrderRequest,
    metadata?: Metadata,
  ): Promise<OrderDto> | Observable<OrderDto> | OrderDto;

  confirmOrder(
    request: ConfirmOrderResquest,
    metadata?: Metadata,
  ):
    | Promise<ConfirmOrderResponse>
    | Observable<ConfirmOrderResponse>
    | ConfirmOrderResponse;

  addToCart(
    request: AddToCartRequest,
    metadata?: Metadata,
  ):
    | Promise<AddToCartResponse>
    | Observable<AddToCartResponse>
    | AddToCartResponse;

  removeFromCart(
    request: RemoveFromCartRequest,
    metadata?: Metadata,
  ):
    | Promise<RemoveFromCartResponse>
    | Observable<RemoveFromCartResponse>
    | RemoveFromCartResponse;

  listCart(
    request: ListCartRequest,
    metadata?: Metadata,
  ):
    | Promise<ListCartResponse>
    | Observable<ListCartResponse>
    | ListCartResponse;

  clearCart(
    request: ClearCartRequest,
    metadata?: Metadata,
  ):
    | Promise<RemoveFromCartResponse>
    | Observable<RemoveFromCartResponse>
    | RemoveFromCartResponse;

  /** voucher */

  createVoucher(
    request: CreateVoucherRequest,
    metadata?: Metadata,
  ): Promise<VoucherResponse> | Observable<VoucherResponse> | VoucherResponse;

  updateVoucher(
    request: UpdateVoucherRequest,
    metadata?: Metadata,
  ): Promise<BooleanPayload> | Observable<BooleanPayload> | BooleanPayload;

  deleteVoucher(
    request: DeleteVoucherRequest,
    metadata?: Metadata,
  ): Promise<BooleanPayload> | Observable<BooleanPayload> | BooleanPayload;

  getVoucher(
    request: GetVoucherRequest,
    metadata?: Metadata,
  ): Promise<VoucherResponse> | Observable<VoucherResponse> | VoucherResponse;

  listVoucher(
    request: ListVoucherRequest,
    metadata?: Metadata,
  ):
    | Promise<ListVoucherResponse>
    | Observable<ListVoucherResponse>
    | ListVoucherResponse;
}

export function ProductServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'createProduct',
      'getProduct',
      'getListProduct',
      'updateProduct',
      'deleteProduct',
      'listProductByIds',
      'isFavoriteProduct',
      'favoriteProduct',
      'createPayment',
      'callBackPaymentZaloProcess',
      'callBackPaymentVNProcess',
      'createComment',
      'listComment',
      'listFeedback',
      'createType',
      'listType',
      'deleteType',
      'listOrderUser',
      'listOrderAdmin',
      'detailOrder',
      'confirmOrder',
      'addToCart',
      'removeFromCart',
      'listCart',
      'clearCart',
      'createVoucher',
      'updateVoucher',
      'deleteVoucher',
      'getVoucher',
      'listVoucher',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('ProductService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('ProductService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const PRODUCT_SERVICE_NAME = 'ProductService';

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
