export interface SectionDataRequestDto {
  sectionId: number;
  key: string;
  value: string;
}

export interface SectionDataResponseDto {
  dataId: number;
  sectionId: number;
  key: string;
  value: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  statusCode: number;
}