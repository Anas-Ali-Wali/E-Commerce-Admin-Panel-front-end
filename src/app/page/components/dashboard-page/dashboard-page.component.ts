import { Component } from '@angular/core';
import { PageService } from '../../services/page.service';
import { PageResponseDto } from '../../interfaces/page-interfaces';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent {
// pages: PageResponseDto[] = [];
//   tenantId = 1;
//   currentPage = 1;
//   pageSize = 10;
//   totalCount = 0;
//   isLoading = false;

//   constructor(
//     private pageService: PageService,
//     private message: NzMessageService
//   ) {}

//   ngOnInit() {
//     this.loadPages();
//   }

//   loadPages() {
//     this.isLoading = true;
//     this.pageService.getPagesByTenant(this.tenantId, this.currentPage, this.pageSize).subscribe({
//       next: (response) => {
//         this.isLoading = false;
//         if (response.success && response.data) {
//           this.pages = response.data.items;
//           this.totalCount = response.data.totalCount;
//         }
//       },
//       error: (err) => {
//         this.isLoading = false;
//         console.error('Load Error:', err);
//         this.message.error('Failed to load pages.');
//       }
//     });
//   }

//   onTenantChange() {
//     this.currentPage = 1;
//     this.loadPages();
//   }

//   onPageChange(page: number) {
//     this.currentPage = page;
//     this.loadPages();
//   }

//   deletePage(id: number) {
//     this.pageService.deletePage(id).subscribe({
//       next: (response) => {
//         if (response.success) {
//           this.message.success('Page deleted successfully');
//           this.loadPages();
//         } else {
//           this.message.error('Failed to delete page');
//         }
//       },
//       error: (err) => {
//         console.error('Delete Error:', err);
//         this.message.error('Server error occurred. Please try again.');
//       }
//     });
//   }





// pages: PageResponseDto[] = [];
//   tenantId!: number;
//   currentPage = 1;
//   pageSize = 10;
//   totalCount = 0;
//   isLoading = false;

//   constructor(
//     private pageService: PageService,
//     private message: NzMessageService
//   ) {}

//   ngOnInit() {
//     // ✅ localStorage se tenantId uthao
//     const user = JSON.parse(localStorage.getItem('user')!);
//     this.tenantId = user.tenantId;
//     this.loadPages();
//   }

//   loadPages() {
//     this.isLoading = true;
//     this.pageService.getPagesByTenant(this.tenantId, this.currentPage, this.pageSize).subscribe({
//       next: (response) => {
//         this.isLoading = false;
//         if (response.success && response.data) {
//           this.pages = response.data.items;
//           this.totalCount = response.data.totalCount;
//         }
//       },
//       error: () => {
//         this.isLoading = false;
//         this.message.error('Failed to load pages.');
//       }
//     });
//   }

  

//   onPageChange(page: number) {
//     this.currentPage = page;
//     this.loadPages();
//   }

//   deletePage(id: number) {
//     this.pageService.deletePage(id).subscribe({
//       next: (response) => {
//         if (response.success) {
//           this.message.success('Page deleted successfully');
//           this.loadPages();
//         } else {
//           this.message.error('Failed to delete page');
//         }
//       },
//       error: () => this.message.error('Server error occurred.')
//     });
//   }






  pages: PageResponseDto[] = [];
  tenantId!: number;
  currentPage = 1;
  pageSize = 10;
  totalCount = 0;
  isLoading = false;
  Math = Math;
 
  // delete modal
  showDeleteModal = false;
  pendingDeleteId!: number;
 
  constructor(
    private pageService: PageService,
    private message: NzMessageService
  ) {}
 
  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.tenantId = user.tenantId;
    this.loadPages();
  }
 
  loadPages() {
    this.isLoading = true;
    this.pageService.getPagesByTenant(this.tenantId, this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success && response.data) {
          this.pages = response.data.items;
          this.totalCount = response.data.totalCount;
        }
      },
      error: () => {
        this.isLoading = false;
        this.message.error('Failed to load pages.');
      }
    });
  }
 
  getPages(): number[] {
    const total = Math.ceil(this.totalCount / this.pageSize);
    return Array.from({ length: total }, (_, i) => i + 1);
  }
 
  onPageChange(page: number) {
    this.currentPage = page;
    this.loadPages();
  }
 
  confirmDelete(id: number) {
    this.pendingDeleteId = id;
    this.showDeleteModal = true;
  }
 
  executeDelete() {
    this.showDeleteModal = false;
    this.pageService.deletePage(this.pendingDeleteId).subscribe({
      next: (response) => {
        if (response.success) {
          this.message.success('Page deleted successfully');
          this.loadPages();
        } else {
          this.message.error('Failed to delete page');
        }
      },
      error: () => this.message.error('Server error occurred.')
    });
  }

}
