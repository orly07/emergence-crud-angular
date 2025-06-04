// src/app/components/confirmation-dialog/confirmation-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>{{ data.message }}</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false">Cancel</button>
      <button
        mat-raised-button
        color="warn"
        [mat-dialog-close]="true"
        cdkFocusInitial
      >
        Confirm
      </button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      h2 {
        margin: 0 0 16px;
        color: var(--text-color);
      }
      mat-dialog-content {
        margin: 0 0 24px;
        color: var(--text-secondary);
      }
      mat-dialog-actions {
        padding: 16px 0 0;
      }
    `,
  ],
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      message: string;
    }
  ) {}
}
