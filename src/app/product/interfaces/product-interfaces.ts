export interface ProductCreateRequestDto {
  tenantId: number;
  name: string;
  description?: string;
  price: number;
  image?: File;
  categoryId?: number;
  stockQty: number;
  sizes?: string[];
  colors?: string[];
  sku?: string;
  brand?: string;
}

export interface ProductUpdateRequestDto {
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  categoryId?: number;
  stockQty: number;
  status: boolean;
  sizes?: string[];
  colors?: string[];
  sku?: string;
  brand?: string;
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
  sizes: string[];
  colors: string[];
  sku?: string;
  brand?: string;
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




export interface ProductImageResponseDto {
  imageId: number;
  productId: number;
  imageUrl: string;
  colorName?: string;
  isPrimary: boolean;
  orderNo: number;
  createdDate: string;
}

export interface ProductImageAddDto {
  productId: number;
  image: File;
  colorName?: string;
  isPrimary: boolean;
  orderNo: number;
}