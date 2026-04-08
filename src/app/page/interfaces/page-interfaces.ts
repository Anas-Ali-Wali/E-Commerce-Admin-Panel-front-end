export interface PageRequestDto {
  tenantId: number;
  title: string;
  slug: string;
  status: boolean;
}

export interface PageResponseDto {
  pageId: number;
  tenantId: number;
  title: string;
  slug: string;
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