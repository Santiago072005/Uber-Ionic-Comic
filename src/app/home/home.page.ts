import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonButton, 
  IonIcon 
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { 
  locationSharp, 
  timeOutline, 
  chevronDownOutline, 
  navigateOutline 
} from 'ionicons/icons';
import { UberService } from '../services/uber';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent, 
    IonHeader, 
    IonToolbar, 
    IonButton, 
    IonIcon
  ],
})
export class HomePage implements OnInit {
  private uberService = inject(UberService);
  private authService = inject(AuthService);
  private router = inject(Router);

  currentUser: any = null;

  activeTab: string = 'Trayecto';
  origin: string = '';
  destination: string = '';
  selectedCity: string = 'Neiva, CO';

  activeDetail: any = null;

  services = [
    {
      id: 'viaje',
      title: 'Viaje',
      desc: 'Viaje a cualquier lugar con la app de Uber. Pida un viaje, súbase y relájese.',
      img: 'https://cdn-icons-png.flaticon.com/512/744/744465.png',
      details: 'Conecta con conductores locales las 24 horas. Disfruta de un viaje cómodo y seguro con tarifas transparentes.'
    },
    {
      id: 'reserve',
      title: 'Reserve',
      desc: 'Reserve su viaje con anticipación para que pueda relajarse ese día.',
      img: 'https://cdn-icons-png.flaticon.com/512/2693/2693507.png',
      details: 'Programa tus viajes desde 30 días hasta 2 horas antes de la recogida. Puntualidad garantizada.'
    },
    {
      id: 'moto',
      title: 'Moto',
      desc: 'Obtén viajes económicos en motocicleta en minutos desde la puerta de tu casa.',
      img: 'https://cdn-icons-png.flaticon.com/512/2972/2972185.png',
      details: 'La opción más rápida y económica para moverte en el tráfico de la ciudad con casco incluido.'
    },
    {
      id: 'aeropuerto',
      title: 'Aeropuerto',
      desc: 'Pide un viaje desde o hacia el aeropuerto con espacio para tu equipaje.',
      img: 'https://cdn-icons-png.flaticon.com/512/3125/3125713.png',
      details: 'Monitoreo de vuelos en tiempo real, opciones con baúl amplio para maletas y puntos de recogida dedicados.'
    },
    {
      id: 'mayores',
      title: 'Personas mayores',
      desc: 'Pide un viaje con asistencia adicional, desde la puerta de tu casa hasta tu destino.',
      img: 'https://cdn-icons-png.flaticon.com/512/2813/2813132.png',
      details: 'Conductores destacados por brindar asistencia para abordar y desembarcar con paciencia y acompañamiento.'
    }
  ];

  constructor() {
    addIcons({ 
      locationSharp, 
      timeOutline, 
      chevronDownOutline, 
      navigateOutline 
    });
  }

  ngOnInit() {
    this.checkUserSession();
  }

  ionViewWillEnter() {
    this.checkUserSession();
  }

  checkUserSession() {
    const savedProfile = localStorage.getItem('user_profile');
    if (savedProfile) {
      this.currentUser = JSON.parse(savedProfile);
    } else if (this.authService.getToken()) {
      this.authService.getProfile().subscribe({
        next: (res: any) => {
          this.currentUser = res.user || res;
          localStorage.setItem('user_profile', JSON.stringify(this.currentUser));
        },
        error: () => {
          this.currentUser = null;
        }
      });
    } else {
      this.currentUser = null;
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  logout() {
    this.authService.logout();
    localStorage.removeItem('user_profile');
    this.currentUser = null;
    alert('Sesión cerrada correctamente');
  }

  selectTab(tabName: string) {
    this.activeTab = tabName;
  }

  changeCity() {
    const city = prompt('Introduce tu ciudad:', this.selectedCity);
    if (city) {
      this.selectedCity = city;
    }
  }

  calculatePrice() {
    if (!this.origin || !this.destination) {
      alert('Por favor ingresa un punto de partida y un destino.');
      return;
    }
    
    this.uberService.estimateFare(4.6766, -74.0483, 4.6664, -74.0536).subscribe({
      next: (res: any) => {
        alert(`Precio estimado: $${res.estimate.estimated_fare} COP`);
      },
      error: () => {
        alert(`Ruta simulada de "${this.origin}" a "${this.destination}". Tarifa estimada: $6.500 COP`);
      }
    });
  }

  showDetail(service: any) {
    this.activeDetail = service;
  }

  closeDetail() {
    this.activeDetail = null;
  }
}