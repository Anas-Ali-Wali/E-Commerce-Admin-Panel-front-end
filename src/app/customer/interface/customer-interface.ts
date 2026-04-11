export interface CustomerCreateDto {
  tenantId: number;
  firstName: string;
  lastName: string;
  email?: string;
  password: string;
  status: boolean;
}

export interface CustomerUpdateDto {
  customerId: number;
  firstName: string;
  lastName: string;
  email?: string;
  status: boolean;
}

export interface CustomerResponseDto {
  customerId: number;
  tenantId: number;
  firstName: string;
  lastName: string;
  email?: string;
  status: boolean;
  createdDate: string;
}