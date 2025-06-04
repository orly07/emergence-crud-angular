// src/app/components/sidebar/sidebar.component.ts
import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;
  isMobileVisible = false;
  isMobile = false;
  activeRoute = '';

  menuItems = [
    { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/products', icon: 'inventory_2', label: 'Products' },
    { path: '/archive', icon: 'archive', label: 'Archive' },
    { path: '/settings', icon: 'settings', label: 'Settings' },
  ];

  constructor(
    private dialog: MatDialog,
    public authService: AuthService,
    public themeService: ThemeService
  ) {}

  ngOnInit() {
    this.checkScreenSize();
    this.activeRoute = window.location.pathname;
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 992;
    if (!this.isMobile) {
      this.isMobileVisible = false;
    }
  }

  toggleSidebar() {
    if (this.isMobile) {
      this.isMobileVisible = !this.isMobileVisible;
    } else {
      this.isCollapsed = !this.isCollapsed;
    }
  }

  closeMobileMenu() {
    if (this.isMobile) {
      this.isMobileVisible = false;
    }
  }

  setActiveRoute(route: string) {
    this.activeRoute = route;
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  logout() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        title: 'Confirm Logout',
        message: 'Are you sure you want to log out?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.authService.logout();
      }
    });
  }
}
