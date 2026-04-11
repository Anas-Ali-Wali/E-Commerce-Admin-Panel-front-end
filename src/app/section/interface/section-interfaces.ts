export interface SectionRequestDto {
  pageId: number;
  type: string;
  orderNo: number;
  status: boolean;
}

export interface SectionResponseDto {
  sectionId: number;
  pageId: number;
  type: string;
  orderNo: number;
  status: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
}