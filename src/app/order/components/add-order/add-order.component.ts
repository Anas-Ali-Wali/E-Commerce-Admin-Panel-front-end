import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { OrderCreateRequestDto } from '../../interfaces/order-interfaces';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent {


orderForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private message: NzMessageService
  ) {
    this.orderForm = this.fb.group({
      customerName: ['', Validators.required],
      customerEmail: ['', Validators.email],
      customerPhone: [''],
      totalAmount: [null, Validators.required],
      status: ['Pending', Validators.required]
    });
  }

  onSubmit() {
    if (this.orderForm.valid) {
      this.isSubmitting = true;

      // ✅ localStorage se tenantId uthao
      const user = JSON.parse(localStorage.getItem('user')!);
      const payload: OrderCreateRequestDto = {
        ...this.orderForm.value,
        tenantId: user.tenantId
      };

      this.orderService.createOrder(payload).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          if (response.success) {
            this.message.success('Order created successfully');
            this.orderForm.reset({ status: 'Pending' });
          } else {
            this.message.error(response.message || 'Failed to create order');
          }
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('API ERROR:', err);
          this.message.error('Server error occurred. Please try again.');
        }
      });
    } else {
      Object.values(this.orderForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}






//  orderForm: FormGroup;
//   isSubmitting = false;

//   constructor(
//     private fb: FormBuilder,
//     private orderService: OrderService,
//     private message: NzMessageService
//   ) {
//     this.orderForm = this.fb.group({
//       tenantId: [null, Validators.required],
//       customerName: ['', Validators.required],
//       customerEmail: ['', Validators.email],
//       customerPhone: [''],
//       totalAmount: [null, Validators.required],
//       status: ['Pending', Validators.required]
//     });
//   }

//   onSubmit() {
//     if (this.orderForm.valid) {
//       this.isSubmitting = true;
//       const request: OrderCreateRequestDto = this.orderForm.value;

//       this.orderService.createOrder(request).subscribe({
//         next: (response) => {
//           this.isSubmitting = false;
//           if (response.success) {
//             this.message.success('Order created successfully');
//             this.orderForm.reset({ status: 'Pending' });
//           } else {
//             this.message.error(response.message || 'Failed to create order');
//           }
//         },
//         error: (err) => {
//           this.isSubmitting = false;
//           console.error('API ERROR:', err);
//           this.message.error('Server error occurred. Please try again.');
//         }
//       });
//     } else {
//       Object.values(this.orderForm.controls).forEach(control => {
//         if (control.invalid) {
//           control.markAsDirty();
//           control.updateValueAndValidity({ onlySelf: true });
//         }
//       });
//     }
//   }

