import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticated.asObservable();
  private supabase: SupabaseClient;

  constructor(private router: Router) {
    // Connect to Supabase
    this.supabase = createClient(
      'https://ivsnlmaakyzfxciaabtv.supabase.co', // replace with your project URL
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2c25sbWFha3l6ZnhjaWFhYnR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwOTY1NzksImV4cCI6MjA2NDY3MjU3OX0.x_U-OG8MNVw8lbr7ayZ4zha7yEQJgHqfyMNB5owpnUo' // replace with your anon/public key
    );

    const token = localStorage.getItem('authToken');
    this.isAuthenticated.next(!!token);
  }

  async login(username: string, password: string): Promise<boolean> {
  const { data, error } = await this.supabase
    .from('user_table')
    .select('*')
    .eq('username', username)
    .eq('password', password)
    .single();

  console.log('Supabase response:', { data, error });

  if (error || !data) {
    return false;
  }

  localStorage.setItem('authToken', JSON.stringify(data));
  this.isAuthenticated.next(true);
  return true;
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
