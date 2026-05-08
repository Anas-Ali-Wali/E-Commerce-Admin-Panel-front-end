export interface TenantSliderRequest {
  tenantId: number;
  imageUrl: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  orderNo: number;
  isActive: boolean;

  layoutType: 'full-image' | 'text-only' | 'split-left' | 'split-right';

  bgColor: string;
  textColor: string;
  overlayOpacity: number;

}

export interface UpdateSliderRequest {
  imageUrl: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  orderNo: number;
  isActive: boolean;

  layoutType: 'full-image' | 'text-only' | 'split-left' | 'split-right';

  bgColor: string;
  textColor: string;
  overlayOpacity: number;

}

export interface TenantSliderResponse {
  sliderId: number;
  tenantId: number;
  imageUrl: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  orderNo: number;
  isActive: boolean;
  createdDate: string;

    layoutType: 'full-image' | 'text-only' | 'split-left' | 'split-right';
  bgColor: string;
  textColor: string;
  overlayOpacity: number;

}