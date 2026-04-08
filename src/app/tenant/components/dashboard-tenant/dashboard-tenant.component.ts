import { Component, OnInit } from '@angular/core';
import { TenantService } from '../../services/tenant.service';
import { TenantResponseDto } from '../../interfaces/tenant-interfaces';

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

  constructor(private tenantService: TenantService) { }

  ngOnInit() {
    this.loadTenants();
  }

  loadTenants() {
    this.tenantService.getAllTenants(this.currentPage, this.pageSize).subscribe(response => {
      if (response.success && response.data) {
        this.tenants = response.data.items;
        this.totalCount = response.data.totalCount;
      }
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadTenants();
  }

  deleteTenant(id: number) {
    if (confirm('Are you sure?')) {
      this.tenantService.deleteTenant(id).subscribe(response => {
        if (response.success) {
          this.loadTenants();
        }
      });
    }
  }
}
