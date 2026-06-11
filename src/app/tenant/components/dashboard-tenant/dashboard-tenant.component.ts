import { Component, OnInit } from '@angular/core';
import { TenantService } from '../../services/tenant.service';
import { TenantResponseDto } from '../../interfaces/tenant-interfaces';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-dashboard-tenant',
  templateUrl: './dashboard-tenant.component.html',
  styleUrls: ['./dashboard-tenant.component.css']
})
export class DashboardTenantComponent implements OnInit {
 tenants: TenantResponseDto[] = [];
  originalTenants: TenantResponseDto[] = [];  // ✅ add
  currentPage = 1;
  pageSize = 10;
  totalCount = 0;
  isLoading = false;
  searchText = '';  // ✅ already tha
  Math = Math;

  constructor(
    private tenantService: TenantService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.loadTenants();
  }

  loadTenants() {
    this.isLoading = true;
    this.tenantService.getAllTenants(1, 1000).subscribe({  // ✅ sab ek baar load
      next: (response) => {
        this.isLoading = false;
        if (response.success && response.data) {
          this.originalTenants = response.data.items;  // ✅
          this.tenants = [...this.originalTenants];     // ✅
          this.totalCount = this.tenants.length;
          this.currentPage = 1;
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.message.error('Failed to load tenants.');
      }
    });
  }

  // ✅ local pagination
  get pagedTenants(): TenantResponseDto[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.tenants.slice(start, start + this.pageSize);
  }

  // ✅ search
  onSearch() {
    const value = this.searchText.toLowerCase();
    this.tenants = this.originalTenants.filter(item =>
      Object.values(item).some(val =>
        val && val.toString().toLowerCase().includes(value)
      )
    );
    this.totalCount = this.tenants.length;
    this.currentPage = 1;
  }

  onPageChange(page: number) {
    this.currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deleteTenant(id: number) {
    this.tenantService.deleteTenant(id).subscribe({
      next: (response) => {
        if (response.success) {
          this.message.success('Tenant deleted successfully');
          this.loadTenants();
        } else {
          this.message.error('Failed to delete tenant');
        }
      },
      error: () => this.message.error('Server error occurred.')
    });
  }

  getPages(): number[] {
    const total = Math.ceil(this.totalCount / this.pageSize);
    return Array.from({ length: total }, (_, i) => i + 1);
  }


}
