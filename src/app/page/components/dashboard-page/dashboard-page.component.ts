import { Component } from '@angular/core';
import { PageService } from '../../services/page.service';
import { PageResponseDto } from '../../interfaces/page-interfaces';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent {
  pages: PageResponseDto[] = [];
  tenantId = 1;
  currentPage = 1;
  pageSize = 10;
  totalCount = 0;

  constructor(private pageService: PageService) { }

  loadPages() {
    this.pageService.getPagesByTenant(this.tenantId, this.currentPage, this.pageSize).subscribe(response => {
      if (response.success && response.data) {
        this.pages = response.data.items;
        this.totalCount = response.data.totalCount;
      }
    });
  }

  onTenantChange() {
    this.currentPage = 1;
    this.loadPages();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadPages();
  }

  deletePage(id: number) {
    if (confirm('Are you sure?')) {
      this.pageService.deletePage(id).subscribe(response => {
        if (response.success) {
          this.loadPages();
        }
      });
    }
  }
}
