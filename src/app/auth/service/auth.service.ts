import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 private apiUrl = `${environment.apiUrl}`;



  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    // return this.http.post(`${this.apiUrl}/login`, data)
    return this.http.post(`${this.apiUrl}/auth/login`, data)
    .pipe(
      tap((res: any) => {
        if (res.success) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data));
        }
      })
    );
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.clear();
}
}
