import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonItem, 
  IonInput, 
  IonButton 
} from '@ionic/angular';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonItem, 
    IonInput, 
    IonButton
  ],
})
export class LoginPage {
  private authService = inject(AuthService);
  private router = inject(Router);

  emailOrPhone: string = '';
  password: string = '';

  goBack() {
    this.router.navigate(['/home']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  onLogin() {
    if (!this.emailOrPhone || !this.password) {
      alert('Por favor, ingresa tu correo/teléfono y contraseña.');
      return;
    }

    this.authService.login({ login: this.emailOrPhone, password: this.password }).subscribe({
      next: (res: any) => {
        alert('¡Bienvenido!');
        this.router.navigate(['/home']);
      },
      error: (err: any) => {
        alert('Error al iniciar sesión. Verifica tus credenciales.');
      }
    });
  }
}