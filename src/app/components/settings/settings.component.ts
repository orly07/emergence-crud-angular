// src/app/components/settings/settings.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ThemeService } from '../../services/theme.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent {
  settingsForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public themeService: ThemeService
  ) {
    this.settingsForm = this.fb.group({
      darkMode: [this.themeService.currentDarkModeValue], // ✅ Using the getter
      notifications: [true],
      itemsPerPage: [10],
    });

    // Watch for theme changes
    this.themeService.isDarkMode$.subscribe((isDark) => {
      this.settingsForm.patchValue({ darkMode: isDark }, { emitEvent: false });
    });
  }

  onDarkModeToggle() {
    this.themeService.toggleDarkMode();
  }

  saveSettings() {
    if (this.settingsForm.valid) {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        this.snackBar.open('Settings saved successfully', 'Close', {
          duration: 3000,
        });
      }, 1000);
    }
  }
}
