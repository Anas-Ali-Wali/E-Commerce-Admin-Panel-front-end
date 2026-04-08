import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { OrderCreateRequestDto } from '../../interfaces/order-interfaces';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent {
  orderForm: FormGroup;

  constructor(private fb: FormBuilder, private orderService: OrderService) {
    this.orderForm = this.fb.group({
      tenantId: [0, Validators.required],
      customerName: ['', Validators.required],
      customerEmail: [''],
      customerPhone: [''],
      totalAmount: [0, Validators.required],
      status: ['Pending']
    });
  }

  onSubmit() {
    if (this.orderForm.valid) {
      const request: OrderCreateRequestDto = this.orderForm.value;
      this.orderService.createOrder(request).subscribe(response => {
        if (response.success) {
          alert('Order created successfully');
          this.orderForm.reset();
        } else {
          alert('Error: ' + response.message);
        }
      });
    }
  }
}
