export interface CategoryRequestDto {
  tenantId: number;
  name: string;
  parentCategoryId?: number;
  status: boolean;
}

export interface CategoryResponseDto {
  categoryId: number;
  tenantId: number;
  name: string;
  parentCategoryId?: number;
  status: boolean;
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