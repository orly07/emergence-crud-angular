// src/app/components/product-modal/product-modal.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { ApiService } from '../../services/api.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css'],
})
export class ProductModalComponent implements OnInit {
  productForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<ProductModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { product: Product | null; isEdit: boolean }
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    if (this.data.isEdit && this.data.product) {
      this.productForm.patchValue({
        name: this.data.product.name,
        price: this.data.product.price,
      });
    }
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      return;
    }

    this.isLoading = true;
    const productData = this.productForm.value;

    if (this.data.isEdit && this.data.product) {
      const updatedProduct = { ...this.data.product, ...productData };
      this.apiService.updateProduct(updatedProduct).subscribe({
        next: () => {
          this.dialogRef.close(true);
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          alert('Error updating product');
        },
      });
    } else {
      this.apiService.createProduct(productData).subscribe({
        next: () => {
          this.dialogRef.close(true);
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          alert('Error creating product');
        },
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
