export interface UserCreateRequestDto {
  tenantId: number;
  name: string;
  email: string;
  passwordHash: string;
  role: string;
}

export interface UserUpdateRequestDto {
  name: string;
  email: string;
  role: string;
  status: boolean;
}

export interface UserResponseDto {
  userId: number;
  tenantId: number;
  name: string;
  email: string;
  role: string;
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