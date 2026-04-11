import { Component } from '@angular/core';
import { CustomerResponseDto } from '../../interface/customer-interface';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent {
customers: CustomerResponseDto[] = [];
  isLoading = false;

  constructor(private service: CustomerService) {}

  ngOnInit() {
    this.load();
  }
load() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const tenantId = user?.tenantId;

  if (!tenantId) {
    console.error('Tenant missing in user object');
    return;
  }

  this.isLoading = true;

  this.service.getByTenant(tenantId).subscribe({
    next: (res: any) => {
      // this.customers = res?.data ?? [];
      this.customers = res?.data?.items ?? [];
      this.isLoading = false;
    },
    error: (err) => {
      console.error('API ERROR:', err);
      this.isLoading = false;
    }
  });
}

  deleteCustomer(id: number) {
    this.service.delete(id).subscribe(() => this.load());
  }

}
