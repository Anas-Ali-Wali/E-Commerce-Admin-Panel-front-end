import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TenantIntegrationService {


  private apiUrl = `${environment.apiUrl}/TenantIntegrations`;
  

  constructor(private http: HttpClient) {}

  getByTenant(tenantId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${tenantId}`);
  }

  save(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/save`, data);
  }

  delete(tenantId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${tenantId}`);
  }
}
