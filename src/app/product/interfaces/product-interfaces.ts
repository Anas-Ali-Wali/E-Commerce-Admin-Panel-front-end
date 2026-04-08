export interface ProductCreateRequestDto {
  tenantId: number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  categoryId?: number;
  stockQty: number;
}

export interface ProductUpdateRequestDto {
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  categoryId?: number;
  stockQty: number;
  status: boolean;
}

export interface ProductResponseDto {
  productId: number;
  tenantId: number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  categoryId?: number;
  stockQty: number;
  status: boolean;
  createdDate: string;
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