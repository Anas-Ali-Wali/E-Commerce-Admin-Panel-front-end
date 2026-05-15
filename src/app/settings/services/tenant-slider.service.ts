import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/Environment/environment';
import {  TenantSliderRequest, TenantSliderResponse, UpdateSliderRequest } from '../interface/tenant-slider';
import { ApiResponse } from '../interface/api-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenantSliderService {

// private apiUrl = `${environment.apiUrl}/api/TenantSlider`;

private apiUrl = `${environment.apiUrl}/TenantSlider`;


  constructor(private http: HttpClient) {}

  // GET admin — sp_TenantSliders_GetAll (inactive bhi)
  getAllSliders(tenantId: number): Observable<ApiResponse<TenantSliderResponse[]>> {
    return this.http.get<ApiResponse<TenantSliderResponse[]>>(
      `${this.apiUrl}/admin/${tenantId}`
    );
  }

  // GET storefront — sp_TenantSliders_GetByTenant (active only)
  getActiveSliders(tenantId: number): Observable<ApiResponse<TenantSliderResponse[]>> {
    return this.http.get<ApiResponse<TenantSliderResponse[]>>(
      `${this.apiUrl}/tenant/${tenantId}`
    );
  }

  // POST — sp_TenantSliders_Add
  addSlider(payload: TenantSliderRequest): Observable<ApiResponse<number>> {
    return this.http.post<ApiResponse<number>>(
      this.apiUrl,
      payload
    );
  }

  // PUT — sp_TenantSliders_Update
  updateSlider(sliderId: number, payload: UpdateSliderRequest): Observable<ApiResponse<boolean>> {
    return this.http.put<ApiResponse<boolean>>(
      `${this.apiUrl}/${sliderId}`,
      payload
    );
  }

  

  // DELETE — sp_TenantSliders_Delete
  deleteSlider(sliderId: number): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(
      `${this.apiUrl}/${sliderId}`
    );
  }


  // GET preset images — naya section ke liye
getPresetImages(tenantId: number): Observable<ApiResponse<TenantSliderResponse[]>> {
  return this.http.get<ApiResponse<TenantSliderResponse[]>>(
    `${this.apiUrl}/preset/${tenantId}`
  );
}
}
