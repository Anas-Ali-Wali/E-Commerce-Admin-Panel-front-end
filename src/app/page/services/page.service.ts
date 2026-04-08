import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageRequestDto, PageResponseDto, ApiResponse, PaginatedResponse } from '../interfaces/page-interfaces';
import { environment } from 'src/Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PageService {

 private apiUrl = `${environment.apiUrl}/page`;

  constructor(private http: HttpClient) { }

  createPage(request: PageRequestDto) {
    return this.http.post<ApiResponse<PageResponseDto>>(`${this.apiUrl}/create`, request);
  }

  getPageById(id: number) {
    return this.http.get<ApiResponse<PageResponseDto>>(`${this.apiUrl}/${id}`);
  }

  getPagesByTenant(tenantId: number, pageNumber = 1, pageSize = 10) {
    return this.http.get<ApiResponse<PaginatedResponse<PageResponseDto>>>(
      `${this.apiUrl}/tenant/${tenantId}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  updatePage(id: number, request: PageRequestDto) {
    return this.http.put<ApiResponse<boolean>>(`${this.apiUrl}/${id}`, request);
  }

  deletePage(id: number) {
    return this.http.delete<ApiResponse<boolean>>(`${this.apiUrl}/${id}`);
  }

}