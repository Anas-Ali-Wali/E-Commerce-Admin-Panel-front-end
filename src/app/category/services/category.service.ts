import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryRequestDto, CategoryResponseDto, ApiResponse, PaginatedResponse } from '../interfaces/category-interfaces';
import { environment } from 'src/Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
private apiUrl = `${environment.apiUrl}/Category`;


  constructor(private http: HttpClient) {}

  createCategory(request: CategoryRequestDto) {
    return this.http.post<ApiResponse<CategoryResponseDto>>(`${this.apiUrl}/create`, request);
  }

  getCategoryById(id: number) {
    return this.http.get<ApiResponse<CategoryResponseDto>>(`${this.apiUrl}/${id}`);
  }

  getCategoriesByTenant(tenantId: number, pageNumber = 1, pageSize = 10) {
    return this.http.get<ApiResponse<PaginatedResponse<CategoryResponseDto>>>(
      `${this.apiUrl}/tenant/${tenantId}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  updateCategory(id: number, request: CategoryRequestDto) {
    return this.http.put<ApiResponse<boolean>>(`${this.apiUrl}/${id}`, request);
  }

  deleteCategory(id: number) {
    return this.http.delete<ApiResponse<boolean>>(`${this.apiUrl}/${id}`);
  }



  // ✅ Naya method — dropdown ke liye
  getAllCategoriesByTenant(tenantId: number) {
    return this.http.get<ApiResponse<PaginatedResponse<CategoryResponseDto>>>(
      `${this.apiUrl}/tenant/${tenantId}?pageNumber=1&pageSize=1000`
    );
  }

}