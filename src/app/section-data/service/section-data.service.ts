import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/Environment/environment';
import { ApiResponse, SectionDataRequestDto, SectionDataResponseDto } from '../interface/section-data-interfaces';

@Injectable({
  providedIn: 'root'
})
export class SectionDataService {
private apiUrl = `${environment.apiUrl}/SectionData`;

  constructor(private http: HttpClient) {}

  // Create
  createSectionData(request: SectionDataRequestDto) {
    return this.http.post<ApiResponse<SectionDataResponseDto>>(
      `${this.apiUrl}/create`,
      request
    );
  }

  // Get all by sectionId
  getDataBySection(sectionId: number) {
    return this.http.get<ApiResponse<SectionDataResponseDto[]>>(
      `${this.apiUrl}/section/${sectionId}`
    );
  }

  // Get by id
  getDataById(id: number) {
    return this.http.get<ApiResponse<SectionDataResponseDto>>(
      `${this.apiUrl}/${id}`
    );
  }

  // Update
  updateSectionData(id: number, request: SectionDataRequestDto) {
    return this.http.put<ApiResponse<boolean>>(
      `${this.apiUrl}/${id}`,
      request
    );
  }

  // Delete
  deleteSectionData(id: number) {
    return this.http.delete<ApiResponse<boolean>>(
      `${this.apiUrl}/${id}`
    );
  }
}
