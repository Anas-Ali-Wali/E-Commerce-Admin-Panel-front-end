import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductCreateRequestDto, ProductUpdateRequestDto, ProductResponseDto, ApiResponse, PaginatedResponse } from '../interfaces/product-interfaces';
import { environment } from 'src/Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

 private apiUrl = `${environment.apiUrl}/product`;

  constructor(private http: HttpClient) { }

  createProduct(request: ProductCreateRequestDto) {
    return this.http.post<ApiResponse<ProductResponseDto>>(`${this.apiUrl}/create`, request);
  }

  getProductById(id: number) {
    return this.http.get<ApiResponse<ProductResponseDto>>(`${this.apiUrl}/${id}`);
  }

  getProductsByTenant(tenantId: number, pageNumber = 1, pageSize = 10) {
    return this.http.get<ApiResponse<PaginatedResponse<ProductResponseDto>>>(
      `${this.apiUrl}/tenant/${tenantId}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  getProductsByCategory(categoryId: number, pageNumber = 1, pageSize = 10) {
    return this.http.get<ApiResponse<PaginatedResponse<ProductResponseDto>>>(
      `${this.apiUrl}/category/${categoryId}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  updateProduct(id: number, request: ProductUpdateRequestDto) {
    return this.http.put<ApiResponse<boolean>>(`${this.apiUrl}/${id}`, request);
  }

  deleteProduct(id: number) {
    return this.http.delete<ApiResponse<boolean>>(`${this.apiUrl}/${id}`);
  }

}