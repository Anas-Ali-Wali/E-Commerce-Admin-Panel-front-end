import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TenantService } from '../../services/tenant.service';
import { TenantRequestDto } from '../../interfaces/tenant-interfaces';

@Component({
  selector: 'app-add-tenant',
  templateUrl: './add-tenant.component.html',
  styleUrls: ['./add-tenant.component.css']
})
export class AddTenantComponent {
  tenantForm: FormGroup;

  constructor(private fb: FormBuilder, private tenantService: TenantService) {
    this.tenantForm = this.fb.group({
      name: ['', Validators.required],
      domain: ['', Validators.required],
      logo: [''],
      themeColor: ['']
    });
  }

  onSubmit() {
    if (this.tenantForm.valid) {
      const request: TenantRequestDto = this.tenantForm.value;
      this.tenantService.createTenant(request).subscribe(response => {
        if (response.success) {
          alert('Tenant created successfully');
          this.tenantForm.reset();
        } else {
          alert('Error: ' + response.message);
        }
      });
    }
  }
}
