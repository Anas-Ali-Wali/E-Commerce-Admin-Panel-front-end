import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { environment } from 'src/Environment/environment';
import { TenantSettingsRequest, TenantSettingsResponse } from '../interface/TenantSettingsRequest';
import { ApiResponse } from '../interface/api-response';
import { environment } from 'src/Environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TenantSettingsService {

// private apiUrl = `${environment.apiUrl}/api/TenantSettings`;
private apiUrl = `${environment.apiUrl}/TenantSettings`;


  constructor(private http: HttpClient) {}

  // GET — sp_TenantSettings_Get
  getSettings(tenantId: number): Observable<ApiResponse<TenantSettingsResponse>> {
    return this.http.get<ApiResponse<TenantSettingsResponse>>(
      `${this.apiUrl}/${tenantId}`
    );
  }

  // POST — sp_TenantSettings_Upsert
  saveSettings(payload: TenantSettingsRequest): Observable<ApiResponse<TenantSettingsResponse>> {
    return this.http.post<ApiResponse<TenantSettingsResponse>>(
      this.apiUrl,
      payload
    );
  }
}
