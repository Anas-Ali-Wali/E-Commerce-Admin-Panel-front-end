import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderCreateRequestDto, OrderUpdateRequestDto, OrderResponseDto, OrderDetailResponseDto, ApiResponse, PaginatedResponse } from '../interfaces/order-interfaces';
import { environment } from 'src/Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = `${environment.apiUrl}/order`;

  constructor(private http: HttpClient) { }

  createOrder(request: OrderCreateRequestDto): Observable<ApiResponse<OrderResponseDto>> {
    return this.http.post<ApiResponse<OrderResponseDto>>(`${this.apiUrl}/create`, request);
  }

  getOrderById(id: number): Observable<ApiResponse<OrderResponseDto>> {
    return this.http.get<ApiResponse<OrderResponseDto>>(`${this.apiUrl}/${id}`);
  }

  getOrdersByTenant(tenantId: number, pageNumber = 1, pageSize = 10) {
    return this.http.get<ApiResponse<PaginatedResponse<OrderResponseDto>>>(
      `${this.apiUrl}/tenant/${tenantId}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  updateOrder(id: number, request: OrderUpdateRequestDto) {
    return this.http.put<ApiResponse<boolean>>(`${this.apiUrl}/${id}`, request);
  }

  deleteOrder(id: number) {
    return this.http.delete<ApiResponse<boolean>>(`${this.apiUrl}/${id}`);
  }

  getOrderDetails(orderId: number) {
    return this.http.get<ApiResponse<OrderDetailResponseDto[]>>(`${this.apiUrl}/${orderId}/details`);
  }

  // ✅ NEW (backend me hai but frontend me missing tha)
  addOrderDetail(request: any) {
    return this.http.post<ApiResponse<OrderDetailResponseDto>>(`${this.apiUrl}/detail/add`, request);
  }

  deleteOrderDetail(detailId: number) {
    return this.http.delete<ApiResponse<boolean>>(`${this.apiUrl}/detail/${detailId}`);
  }

  getAllOrdersByTenant(tenantId: number) {
  return this.http.get<ApiResponse<PaginatedResponse<OrderResponseDto>>>(
    `${this.apiUrl}/tenant/${tenantId}?pageNumber=1&pageSize=1000`
  );
}
}