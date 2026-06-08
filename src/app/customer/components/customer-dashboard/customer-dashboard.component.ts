import { Component } from '@angular/core';
import { CustomerResponseDto } from '../../interface/customer-interface';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent {
// customers: CustomerResponseDto[] = [];
//   isLoading = false;

//   constructor(private service: CustomerService) {}

//   ngOnInit() {
//     this.load();
//   }
// load() {
//   const user = JSON.parse(localStorage.getItem('user') || '{}');
//   const tenantId = user?.tenantId;

//   if (!tenantId) {
//     console.error('Tenant missing in user object');
//     return;
//   }

//   this.isLoading = true;

//   this.service.getByTenant(tenantId).subscribe({
//     next: (res: any) => {
//       // this.customers = res?.data ?? [];
//       this.customers = res?.data?.items ?? [];
//       this.isLoading = false;
//     },
//     error: (err) => {
//       console.error('API ERROR:', err);
//       this.isLoading = false;
//     }
//   });
// }

//   deleteCustomer(id: number) {
//     this.service.delete(id).subscribe(() => this.load());
//   }







  customers: CustomerResponseDto[] = [];
  originalCustomers: CustomerResponseDto[] = [];
  searchText = '';
  isLoading = false;
  currentPage = 1;
  pageSize = 10;
  Math = Math;

  // delete modal
  showDeleteModal = false;
  pendingDeleteId!: number;

  constructor(private service: CustomerService) {}

  ngOnInit() {
    this.load();
  }

  get pagedCustomers(): CustomerResponseDto[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.customers.slice(start, start + this.pageSize);
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
        this.originalCustomers = res?.data?.items ?? [];
        this.customers = [...this.originalCustomers];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('API ERROR:', err);
        this.isLoading = false;
      }
    });
  }

  onSearch() {
    const value = this.searchText.toLowerCase();
    this.customers = this.originalCustomers.filter(item =>
      Object.values(item).some(val =>
        val && val.toString().toLowerCase().includes(value)
      )
    );
    this.currentPage = 1;
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  getPages(): number[] {
    const total = Math.ceil(this.customers.length / this.pageSize);
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  confirmDelete(id: number) {
    this.pendingDeleteId = id;
    this.showDeleteModal = true;
  }

  deleteCustomer() {
    this.showDeleteModal = false;
    this.service.delete(this.pendingDeleteId).subscribe(() => this.load());
  }

}
