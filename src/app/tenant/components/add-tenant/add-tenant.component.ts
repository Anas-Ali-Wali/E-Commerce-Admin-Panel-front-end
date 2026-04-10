import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TenantService } from '../../services/tenant.service';
import { TenantRequestDto } from '../../interfaces/tenant-interfaces';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-add-tenant',
  templateUrl: './add-tenant.component.html',
  styleUrls: ['./add-tenant.component.css']
})
export class AddTenantComponent {
tenantForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private tenantService: TenantService,
    private message: NzMessageService
  ) {
    this.tenantForm = this.fb.group({
      name: ['', Validators.required],
      domain: ['', Validators.required],
      logo: [''],
      themeColor: ['']
    });
  }

  onSubmit() {
    if (this.tenantForm.valid) {
      this.isSubmitting = true;
      const request: TenantRequestDto = this.tenantForm.value;

      this.tenantService.createTenant(request).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          if (response.success) {
            this.message.success('Tenant created successfully');
            this.tenantForm.reset();
          } else {
            this.message.error(response.message || 'Failed to create tenant');
          }
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('API ERROR:', err);
          this.message.error('Server error occurred. Please try again.');
        }
      });
    } else {
      Object.values(this.tenantForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}
