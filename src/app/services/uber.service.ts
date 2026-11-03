import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth'; // O './auth.service' si lo renombraste

@Injectable({
  providedIn: 'root'
})
export class UberService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  
  // URL base de la API de Laravel
  private apiUrl = 'http://127.0.0.1:8000/api';

  // Helper para adjuntar el token JWT en el encabezado
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // GET /api/fares/active
  getActiveFare(): Observable<any> {
    return this.http.get(`${this.apiUrl}/fares/active`);
  }

  // POST /api/client/estimate-fare
  estimateFare(originLat: number, originLng: number, destLat: number, destLng: number): Observable<any> {
    const body = {
      origin_latitude: originLat,
      origin_longitude: originLng,
      destination_latitude: destLat,
      destination_longitude: destLng
    };
    return this.http.post(`${this.apiUrl}/client/estimate-fare`, body, { headers: this.getHeaders() });
  }

  // POST /api/client/ride-requests
  requestRide(data: { 
    origin_name: string; 
    origin_latitude: number; 
    origin_longitude: number; 
    destination_name: string; 
    destination_latitude: number; 
    destination_longitude: number; 
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/client/ride-requests`, data, { headers: this.getHeaders() });
  }

  // GET /api/client/active
  getActiveRide(): Observable<any> {
    return this.http.get(`${this.apiUrl}/client/active`, { headers: this.getHeaders() });
  }

  // GET /api/client/trips
  getTripHistory(): Observable<any> {
    return this.http.get(`${this.apiUrl}/client/trips`, { headers: this.getHeaders() });
  }
}