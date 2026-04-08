export interface OrderCreateRequestDto {
  tenantId: number;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  totalAmount: number;
  status: string;
}

export interface OrderUpdateRequestDto {
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  totalAmount: number;
  status: string;
}

export interface OrderResponseDto {
  orderId: number;
  tenantId: number;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  totalAmount: number;
  status: string;
  createdDate: string;
  orderDetails?: OrderDetailResponseDto[];
}

export interface OrderDetailResponseDto {
  orderDetailId: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  statusCode: number;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}