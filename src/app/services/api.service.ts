import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private products: Product[] = [
    { id: 1, name: 'HDD', price: 6000 },
    { id: 2, name: 'Monitor', price: 8000 },
    { id: 3, name: 'Printer', price: 10000 },
    { id: 4, name: 'Scanner', price: 5000 },
  ];

  private archivedProducts: Product[] = [];

  getProducts(): Observable<Product[]> {
    return of(this.products.filter((p) => !p.isArchived)).pipe(delay(500));
  }

  getArchivedProducts(): Observable<Product[]> {
    return of(this.archivedProducts).pipe(delay(500));
  }

  createProduct(product: Omit<Product, 'id'>): Observable<Product> {
    const newProduct: Product = {
      ...product,
      id: this.products.length + 1,
    };
    this.products.push(newProduct);
    return of(newProduct).pipe(delay(500));
  }

  updateProduct(product: Product): Observable<Product> {
    const index = this.products.findIndex((p) => p.id === product.id);
    if (index >= 0) {
      this.products[index] = product;
    }
    return of(product).pipe(delay(500));
  }

  archiveProduct(id: number): Observable<void> {
    const index = this.products.findIndex((p) => p.id === id);
    if (index >= 0) {
      const product = {
        ...this.products[index],
        isArchived: true,
        archivedAt: new Date(),
      };
      this.archivedProducts.push(product);
      this.products.splice(index, 1);
    }
    return of(void 0).pipe(delay(500));
  }

  restoreProduct(id: number): Observable<void> {
    const index = this.archivedProducts.findIndex((p) => p.id === id);
    if (index >= 0) {
      const product = {
        ...this.archivedProducts[index],
        isArchived: false,
        archivedAt: undefined,
      };
      this.products.push(product);
      this.archivedProducts.splice(index, 1);
    }
    return of(void 0).pipe(delay(500));
  }

  deleteProduct(id: number): Observable<void> {
    this.archivedProducts = this.archivedProducts.filter((p) => p.id !== id);
    return of(void 0).pipe(delay(500));
  }
}
