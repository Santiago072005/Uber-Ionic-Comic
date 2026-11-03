import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class UberService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  
  private apiUrl = 'http://20.20.1.157:8000/api';

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getActiveFare(): Observable<any> {
    return this.http.get(`${this.apiUrl}/fares/active`);
  }

  estimateFare(originLat: number, originLng: number, destLat: number, destLng: number): Observable<any> {
    const body = {
      origin_latitude: originLat,
      origin_longitude: originLng,
      destination_latitude: destLat,
      destination_longitude: destLng
    };
    return this.http.post(`${this.apiUrl}/client/estimate-fare`, body, { headers: this.getHeaders() });
  }
}