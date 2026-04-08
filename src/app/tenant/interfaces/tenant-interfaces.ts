export interface TenantRequestDto {
  name: string;
  domain: string;
  logo?: string;
  themeColor?: string;
}

export interface TenantResponseDto {
  tenantId: number;
  name: string;
  domain: string;
  logo?: string;
  themeColor?: string;
  createdDate: string;
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