import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserCreateRequestDto } from '../../interfaces/user-interfaces';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TenantResponseDto } from 'src/app/tenant/interfaces/tenant-interfaces';
import { TenantService } from 'src/app/tenant/services/tenant.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
 userForm: FormGroup;
  isSubmitting = false;
  passwordVisible = false;
    tenants: TenantResponseDto[] = [];  // ✅


  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private message: NzMessageService,
        private tenantService: TenantService,  // ✅

  ) {
    this.userForm = this.fb.group({
      tenantId: [null, Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['user', Validators.required]
    });
  }

    ngOnInit() {
    this.loadTenants();  // ✅
  }

  loadTenants() {
    this.tenantService.getAllTenants(1, 100).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.tenants = response.data.items;
        }
      },
      error: () => this.message.error('Failed to load tenants.')
    });
  }


  // onSubmit() {
  //   if (this.userForm.valid) {
  //     this.isSubmitting = true;
  //     const request: UserCreateRequestDto = this.userForm.value;

  //     this.userService.createUser(request).subscribe({
  //       next: (response) => {
  //         this.isSubmitting = false;
  //         if (response.success) {
  //           this.message.success('User created successfully');
  //           this.userForm.reset({ role: 'User' });
  //         } else {
  //           this.message.error(response.message || 'Failed to create user');
  //         }
  //       },
  //       error: (err) => {
  //         this.isSubmitting = false;
  //         console.error('API ERROR:', err);
  //         this.message.error('Server error occurred. Please try again.');
  //       }
  //     });
  //   } else {
  //     Object.values(this.userForm.controls).forEach(control => {
  //       if (control.invalid) {
  //         control.markAsDirty();
  //         control.updateValueAndValidity({ onlySelf: true });
  //       }
  //     });
  //   }
  // }

  onSubmit() {
    if (this.userForm.valid) {
      this.isSubmitting = true;
      const request: UserCreateRequestDto = this.userForm.value;

      this.userService.createUser(request).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          if (response.success) {
            this.message.success('User created successfully');
            this.userForm.reset({ role: 'User' });
          } else {
            this.message.error(response.message || 'Failed to create user');
          }
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('API ERROR:', err);
          this.message.error('Server error occurred. Please try again.');
        }
      });
    } else {
      Object.values(this.userForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }


}
