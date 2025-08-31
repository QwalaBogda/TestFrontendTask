import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthStore {
  private tokenSignal = signal<string | null>(localStorage.getItem('token'));
  private router = inject(Router);

  isLoggedIn = computed(() => {
    const token = this.tokenSignal();
    return !!token;
  });

  setToken(value: string | null) {
    this.tokenSignal.set(value);
    
    if (value) {
      localStorage.setItem('token', value);
    } else {
      localStorage.removeItem('token');
    }
  }
  
  getToken() {
    return this.tokenSignal();
  }

  logout() {
    this.setToken(null);
    this.router.navigate(['/login']);
  }
}