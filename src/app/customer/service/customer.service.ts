import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/Environment/environment';
import { CustomerCreateDto } from '../interface/customer-interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
private apiUrl = `${environment.apiUrl}/Customer`;

  constructor(private http: HttpClient) {}

  create(data: CustomerCreateDto) {
    return this.http.post(`${this.apiUrl}/create`, data);
  }

  // getByTenant(tenantId: number) {
  //   return this.http.get(`${this.apiUrl}/tenant/${tenantId}`);
  // }


  getByTenant(tenantId: number) {
  return this.http.get(`${this.apiUrl}/tenant/${tenantId}?pageNumber=1&pageSize=1000`);
}

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  }
