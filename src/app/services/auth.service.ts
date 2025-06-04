import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticated.asObservable();

  constructor(private router: Router) {
    // Check initial auth state
    const token = localStorage.getItem('authToken');
    this.isAuthenticated.next(!!token);
  }

  login(username: string, password: string): boolean {
    // In a real app, this would be an API call
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('authToken', 'fake-jwt-token');
      this.isAuthenticated.next(true);
      this.router.navigate(['/dashboard']);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('authToken');
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }

  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
