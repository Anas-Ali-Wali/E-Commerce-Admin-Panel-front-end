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
 
  // ✅ Get settings by tenant
  getByTenant(tenantId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${tenantId}`);
  }
 
  // ✅ Save (upsert)
  save(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/save`, data);
  }
 
  // ✅ Delete
  delete(tenantId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${tenantId}`);
  }
 
  // ✅ Test WhatsApp
  testWhatsApp(tenantId: number, phone: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/test-whatsapp`, { tenantId, phone });
  }
 
  // ✅ Test Email
  testEmail(tenantId: number, email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/test-email`, { tenantId, email });
  }
 
  // ✅ Get notification logs
  getLogs(tenantId: number, page = 1, pageSize = 20): Observable<any> {
    return this.http.get(`${this.apiUrl}/${tenantId}/logs?page=${page}&pageSize=${pageSize}`);
  }
 
  // ✅ Get logs by order
  getOrderLogs(tenantId: number, orderId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${tenantId}/logs/order/${orderId}`);
  }
 
  // ✅ Get failed logs
  getFailedLogs(tenantId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${tenantId}/logs/failed`);
  }

}
