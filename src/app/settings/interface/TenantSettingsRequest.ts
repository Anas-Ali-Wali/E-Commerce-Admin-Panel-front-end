export interface TenantSettingsRequest {
  tenantId: number;
  storeName?: string;
  logoUrl?: string;
  faviconUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  navbarBgColor: string;
  navbarTextColor: string;
  footerBgColor: string;
  footerTextColor: string;
  buttonColor: string;
  buttonTextColor: string;
  fontFamily: string;
  facebookUrl?: string;
  instagramUrl?: string;
  whatsappNumber?: string;
  footerTagline?: string;
  heroBgColor: string;  // ✅ add karo

    // ✅ New
  promoBannerBg: string;
  promoBannerText: string;
  cardBg: string;
  cardText: string;
}

export interface TenantSettingsResponse {
  settingId: number;
  tenantId: number;
  storeName?: string;
  logoUrl?: string;
  faviconUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  navbarBgColor: string;
  navbarTextColor: string;
  footerBgColor: string;
  footerTextColor: string;
  buttonColor: string;
  buttonTextColor: string;
  fontFamily: string;
  facebookUrl?: string;
  instagramUrl?: string;
  whatsappNumber?: string;
  footerTagline?: string;
  updatedDate: string;
  heroBgColor: string;  // ✅ add karo

    // ✅ New
  promoBannerBg: string;
  promoBannerText: string;
  cardBg: string;
  cardText: string;
}