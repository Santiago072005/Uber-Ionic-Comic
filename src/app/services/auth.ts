import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  
  // URL base con la IP actualizada del profesor
  private apiUrl = 'http://20.20.1.51:8000/api';

  // Almacena el token JWT en localStorage
  setToken(token: string): void {
    localStorage.setItem('jwt_token', token);
  }

  // Obtiene el token JWT guardado
  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  // Elimina el token para cerrar sesión
  logout(): void {
    localStorage.removeItem('jwt_token');
  }

  // POST /api/auth/login
  login(credentials: { login: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap((res: any) => {
        if (res.success && res.access_token) {
          this.setToken(res.access_token);
        }
      })
    );
  }

  // POST /api/auth/register (Acepta cliente o conductor)
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, userData).pipe(
      tap((res: any) => {
        if (res.success && res.access_token) {
          this.setToken(res.access_token);
        }
      })
    );
  }

  // GET /api/auth/me (Perfil del usuario autenticado)
  getProfile(): Observable<any> {
    const token = this.getToken();
    return this.http.get(`${this.apiUrl}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // POST /api/auth/forgot-password (Restablecimiento de clave)
  forgotPassword(data: { email: string; new_password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/forgot-password`, data);
  }
}