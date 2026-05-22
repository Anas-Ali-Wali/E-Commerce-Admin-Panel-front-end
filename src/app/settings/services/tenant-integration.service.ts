import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TenantIntegrationService {

  private apiUrl       = `${environment.apiUrl}/TenantIntegrations`;
  private logsApiUrl   = `${environment.apiUrl}/NotificationLogs`;

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

  // ✅ Test WhatsApp — FIXED
  testWhatsApp(tenantId: number, phone: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/test-whatsapp/${tenantId}?toPhone=${phone}`, {}
    );
  }

  // ✅ Test Email — FIXED
  testEmail(tenantId: number, email: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/test-email/${tenantId}?toEmail=${email}`, {}
    );
  }

  // ✅ Notification Logs — FIXED (alag controller)
  getLogs(tenantId: number, page = 1, pageSize = 20): Observable<any> {
    return this.http.get(
      `${this.logsApiUrl}/tenant/${tenantId}?page=${page}&pageSize=${pageSize}`
    );
  }

  // ✅ Logs by Order — FIXED
  getOrderLogs(tenantId: number, orderId: number): Observable<any> {
    return this.http.get(
      `${this.logsApiUrl}/order/${orderId}?tenantId=${tenantId}`
    );
  }

  // ✅ Failed Logs — FIXED
  getFailedLogs(tenantId: number): Observable<any> {
    return this.http.get(
      `${this.logsApiUrl}/failed/${tenantId}`
    );
  }
}