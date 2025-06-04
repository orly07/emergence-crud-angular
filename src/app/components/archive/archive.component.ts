// src/app/components/archive/archive.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css'],
})
export class ArchiveComponent implements OnInit {
  archivedProducts: Product[] = [];
  isLoading = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadArchivedProducts();
  }

  loadArchivedProducts(): void {
    this.isLoading = true;
    this.apiService.getArchivedProducts().subscribe({
      next: (products) => {
        this.archivedProducts = products;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        alert('Error loading archived products');
      },
    });
  }

  restoreProduct(id: number): void {
    if (confirm('Are you sure you want to restore this product?')) {
      this.isLoading = true;
      this.apiService.restoreProduct(id).subscribe({
        next: () => {
          this.loadArchivedProducts();
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          alert('Error restoring product');
        },
      });
    }
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to permanently delete this product?')) {
      this.isLoading = true;
      this.apiService.deleteProduct(id).subscribe({
        next: () => {
          this.loadArchivedProducts();
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          alert('Error deleting product');
        },
      });
    }
  }
}
