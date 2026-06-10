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
  currentPage = 1;
  pageSize = 10;
  totalCount = 0;
  isLoading = false;
  searchText = '';
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
    this.tenantService.getAllTenants(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success && response.data) {
          this.tenants = response.data.items;
          this.totalCount = response.data.totalCount;
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Load Error:', err);
        this.message.error('Failed to load tenants.');
      }
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadTenants();
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
      error: (err) => {
        console.error('Delete Error:', err);
        this.message.error('Server error occurred. Please try again.');
      }
    });
  }



  getPages(): number[] {
    const total = Math.ceil(this.totalCount / this.pageSize);
    return Array.from({ length: total }, (_, i) => i + 1);
  }

}
