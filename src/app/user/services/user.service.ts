import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserCreateRequestDto, UserUpdateRequestDto, UserResponseDto, ApiResponse, PaginatedResponse } from '../interfaces/user-interfaces';
import { environment } from 'src/Environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private apiUrl = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient) {}

  createUser(request: UserCreateRequestDto) {
    return this.http.post<ApiResponse<UserResponseDto>>(`${this.apiUrl}/create`, request);
  }

  getUserById(id: number) {
    return this.http.get<ApiResponse<UserResponseDto>>(`${this.apiUrl}/${id}`);
  }

  getUsersByTenant(tenantId: number, pageNumber = 1, pageSize = 1000) {
    return this.http.get<ApiResponse<PaginatedResponse<UserResponseDto>>>(
      `${this.apiUrl}/tenant/${tenantId}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  updateUser(id: number, request: UserUpdateRequestDto) {
    return this.http.put<ApiResponse<boolean>>(`${this.apiUrl}/${id}`, request);
  }

  deleteUser(id: number) {
    return this.http.delete<ApiResponse<boolean>>(`${this.apiUrl}/${id}`);
  }

}