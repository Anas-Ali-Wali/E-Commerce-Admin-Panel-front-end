import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent {
  customerForm: FormGroup;
  isSubmitting = false;
 passwordVisible = false;

  constructor(
    private fb: FormBuilder,
    private service: CustomerService,
    private message: NzMessageService
  ) {
    this.customerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required],
      status: [true]
    });
  }

  submit() {
    if (this.customerForm.valid) {

      this.isSubmitting = true;

      const user = JSON.parse(localStorage.getItem('user')!);

      const payload = {
        ...this.customerForm.value,
        tenantId: user.tenantId
      };

      this.service.create(payload).subscribe({
        next: (res) => {
          this.isSubmitting = false;

          this.message.success('Customer created successfully');

          this.customerForm.reset({ status: true });
        },
        error: (err) => {
          this.isSubmitting = false;

          console.error(err);
          this.message.error(err?.error?.message || 'Server error');
        }
      });

    } else {
      Object.values(this.customerForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  toggleStatus() {
  const current = this.customerForm.get('status')?.value;
  this.customerForm.patchValue({ status: !current });
}

}
