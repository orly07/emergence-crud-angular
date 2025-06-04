// src/app/components/products/products.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Import these correctly in your project:
import { ProductModalComponent } from '../product-modal/product-modal.component'; // Check path
import { Product } from '../../models/product'; // Define this interface in your project
import { ApiService } from '../../services/api.service'; // Your API service

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  isLoading = false;
  searchTerm = '';

  constructor(private apiService: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.apiService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        alert('Error loading products');
      },
    });
  }

  openAddProductModal(): void {
    const dialogRef = this.dialog.open(ProductModalComponent, {
      width: '500px',
      data: { product: null, isEdit: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadProducts();
      }
    });
  }

  openEditProductModal(product: Product): void {
    const dialogRef = this.dialog.open(ProductModalComponent, {
      width: '500px',
      data: { product: { ...product }, isEdit: true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadProducts();
      }
    });
  }

  archiveProduct(id: number): void {
    if (confirm('Are you sure you want to archive this product?')) {
      this.isLoading = true;
      this.apiService.archiveProduct(id).subscribe({
        next: () => {
          this.loadProducts();
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          alert('Error archiving product');
        },
      });
    }
  }

  get filteredProducts(): Product[] {
    return this.products.filter((product) =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
