import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TenantRequestDto, TenantResponseDto, ApiResponse, PaginatedResponse } from '../interfaces/tenant-interfaces';
import { environment } from 'src/Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

 private apiUrl = `${environment.apiUrl}/tenant`;

  constructor(private http: HttpClient) {}

  createTenant(request: TenantRequestDto) {
    return this.http.post<ApiResponse<TenantResponseDto>>(`${this.apiUrl}/create`, request);
  }

  getTenantById(id: number) {
    return this.http.get<ApiResponse<TenantResponseDto>>(`${this.apiUrl}/${id}`);
  }

  getAllTenants(pageNumber = 1, pageSize = 10) {
    return this.http.get<ApiResponse<PaginatedResponse<TenantResponseDto>>>(
      `${this.apiUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  updateTenant(id: number, request: TenantRequestDto) {
    return this.http.put<ApiResponse<boolean>>(`${this.apiUrl}/${id}`, request);
  }

  deleteTenant(id: number) {
    return this.http.delete<ApiResponse<boolean>>(`${this.apiUrl}/${id}`);
  }

}