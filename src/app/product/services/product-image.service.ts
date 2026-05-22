import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/Environment/environment';
import { ApiResponse, ProductImageResponseDto } from '../interfaces/product-interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {

  private apiUrl = `${environment.apiUrl}/ProductImage`;
  

  constructor(private http: HttpClient) {}

  // Product ki sari images lao
  getImagesByProduct(productId: number) {
    return this.http.get<ApiResponse<ProductImageResponseDto[]>>(
      `${this.apiUrl}/${productId}`
    );
  }

  // Image upload karo
  addImage(formData: FormData) {
    return this.http.post<ApiResponse<ProductImageResponseDto>>(
      `${this.apiUrl}/add`,
      formData
    );
  }

  // Image delete karo
  deleteImage(imageId: number) {
    return this.http.delete<ApiResponse<boolean>>(
      `${this.apiUrl}/${imageId}`
    );
  }

  // Primary set karo
  setPrimary(imageId: number, productId: number) {
    return this.http.put<ApiResponse<boolean>>(
      `${this.apiUrl}/set-primary`,
      { imageId, productId }
    );
  }
}
