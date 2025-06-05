import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://ivsnlmaakyzfxciaabtv.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2c25sbWFha3l6ZnhjaWFhYnR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwOTY1NzksImV4cCI6MjA2NDY3MjU3OX0.x_U-OG8MNVw8lbr7ayZ4zha7yEQJgHqfyMNB5owpnUo'
    );
  }

  // Fetch all active (non-archived) products
  getProducts(): Observable<Product[]> {
    return from(
      this.supabase
        .from('product_table')
        .select('id, product_name, price')
        .eq('is_archived', false)
    ).pipe(
      map((result: any) => {
        if (result.error) throw result.error;
        return result.data.map((p: any) => ({
          id: p.id,
          name: p.product_name,
          price: p.price,
        }));
      })
    );
  }

  // Fetch archived products
  getArchivedProducts(): Observable<Product[]> {
    return from(
      this.supabase
        .from('product_table')
        .select('id, product_name, price, archived_at')
        .eq('is_archived', true)
    ).pipe(
      map((result: any) => {
        if (result.error) throw result.error;
        return result.data.map((p: any) => ({
          id: p.id,
          name: p.product_name,
          price: p.price,
          archivedAt: p.archived_at ? new Date(p.archived_at) : null,
        }));
      })
    );
  }

  // Add a new product
  createProduct(product: Omit<Product, 'id'>): Observable<Product> {
    return from(
      this.supabase
        .from('product_table')
        .insert({
          product_name: product.name,
          price: product.price,
          is_archived: false,
        })
        .select()
        .single()
    ).pipe(
      map((result: any) => {
        if (result.error) throw result.error;
        return {
          id: result.data.id,
          name: result.data.product_name,
          price: result.data.price,
        };
      })
    );
  }

  // Update an existing product
  updateProduct(product: Product): Observable<Product> {
    return from(
      this.supabase
        .from('product_table')
        .update({ product_name: product.name, price: product.price })
        .eq('id', product.id)
        .select()
        .single()
    ).pipe(
      map((result: any) => {
        if (result.error) throw result.error;
        return {
          id: result.data.id,
          name: result.data.product_name,
          price: result.data.price,
        };
      })
    );
  }

  // Archive a product (set is_archived = true)
  archiveProduct(id: number): Observable<void> {
    return from(
      this.supabase
        .from('product_table')
        .update({ is_archived: true, archived_at: new Date().toISOString() })
        .eq('id', id)
    ).pipe(
      map((result: any) => {
        if (result.error) throw result.error;
      })
    );
  }

  // Restore an archived product (set is_archived = false)
  restoreProduct(id: number): Observable<void> {
    return from(
      this.supabase
        .from('product_table')
        .update({ is_archived: false })
        .eq('id', id)
    ).pipe(
      map((result: any) => {
        if (result.error) throw result.error;
      })
    );
  }

  // Permanently delete a product
  deleteProduct(id: number): Observable<void> {
    return from(this.supabase.from('product_table').delete().eq('id', id)).pipe(
      map((result: any) => {
        if (result.error) throw result.error;
      })
    );
  }
}
