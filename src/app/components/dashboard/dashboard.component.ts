import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [MatIconModule],
})
export class DashboardComponent {
  stats = {
    activeProducts: 0,
    archivedProducts: 0,
  };

  constructor(private apiService: ApiService, private router: Router) {
    this.loadStats();
  }

  loadStats() {
    this.apiService.getProducts().subscribe((products) => {
      this.stats.activeProducts = products.length;
    });

    this.apiService.getArchivedProducts().subscribe((products) => {
      this.stats.archivedProducts = products.length;
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
