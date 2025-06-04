import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ThemeService } from './services/theme.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    SidebarComponent,
    RouterModule, // <-- Add this for <router-outlet>
    CommonModule, // <-- Add this for *ngIf and async pipe
  ],
})
export class AppComponent {
  constructor(
    public authService: AuthService,
    private themeService: ThemeService
  ) {
    this.themeService.isDarkMode$.subscribe((isDark) => {
      if (isDark) {
        document.documentElement.classList.add('dark-theme');
      } else {
        document.documentElement.classList.remove('dark-theme');
      }
    });
  }
}
