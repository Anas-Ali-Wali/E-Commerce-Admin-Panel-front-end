import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TenantSettingsService } from '../../services/tenant-settings.service';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.css']
})
export class GeneralSettingsComponent {
form!: FormGroup;
  loading = false;
  saving = false;
  successMsg = '';
  errorMsg = '';
  tenantId = Number(localStorage.getItem('tenantId')) || 8;

  constructor(
    private fb: FormBuilder,
    private service: TenantSettingsService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadSettings();
  }

  initForm(): void {
    this.form = this.fb.group({
      storeName:    [''],
      logoUrl:      [''],
      faviconUrl:   [''],
      footerTagline:['']
    });
  }

  loadSettings(): void {
    this.loading = true;
    this.service.getSettings(this.tenantId).subscribe({
      next: (res) => {
        if (res.success && res.data) this.form.patchValue(res.data);
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  onSubmit(): void {
    this.saving = true;
    this.successMsg = '';
    this.errorMsg = '';

    this.service.getSettings(this.tenantId).subscribe({
      next: (res) => {
        const payload = {
          ...res.data,
          ...this.form.value,
          tenantId: this.tenantId
        };
        this.service.saveSettings(payload).subscribe({
          next: (r) => {
            this.successMsg = r.success ? 'Settings saved successfully!' : r.message;
            this.saving = false;
          },
          error: () => {
            this.errorMsg = 'Something went wrong!';
            this.saving = false;
          }
        });
      }
    });
  }

}
