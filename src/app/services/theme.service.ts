// src/app/services/theme.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode = new BehaviorSubject<boolean>(false);
  isDarkMode$ = this.darkMode.asObservable();

  constructor() {
    this.initializeTheme();
  }

  private initializeTheme() {
    const savedMode = localStorage.getItem('darkMode');
    const systemDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const initialMode = savedMode ? savedMode === 'true' : systemDark;
    this.darkMode.next(initialMode);
    this.applyTheme(initialMode);
  }

  toggleDarkMode() {
    const newMode = !this.darkMode.value;
    this.darkMode.next(newMode);
    localStorage.setItem('darkMode', String(newMode));
    this.applyTheme(newMode);
  }

  private applyTheme(isDark: boolean) {
    if (isDark) {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
  }

  // ✅ Public getter for current value
  get currentDarkModeValue(): boolean {
    return this.darkMode.value;
  }
}
