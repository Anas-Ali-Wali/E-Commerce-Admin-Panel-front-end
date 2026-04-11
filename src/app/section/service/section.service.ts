import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/Environment/environment';
import { ApiResponse, SectionRequestDto, SectionResponseDto } from '../interface/section-interfaces';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

private apiUrl = `${environment.apiUrl}/Section`;

  constructor(private http: HttpClient) {}

  createSection(request: SectionRequestDto) {
    return this.http.post<ApiResponse<SectionResponseDto>>(`${this.apiUrl}/create`, request);
  }

  getSectionsByPage(pageId: number) {
    return this.http.get<ApiResponse<SectionResponseDto[]>>(`${this.apiUrl}/page/${pageId}`);
  }

  getSectionById(id: number) {
    return this.http.get<ApiResponse<SectionResponseDto>>(`${this.apiUrl}/${id}`);
  }

  updateSection(id: number, request: SectionRequestDto) {
    return this.http.put<ApiResponse<boolean>>(`${this.apiUrl}/${id}`, request);
  }

  deleteSection(id: number) {
    return this.http.delete<ApiResponse<boolean>>(`${this.apiUrl}/${id}`);
  }
}
