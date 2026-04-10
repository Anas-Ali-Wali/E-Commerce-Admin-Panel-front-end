import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { CategoryResponseDto } from '../../interfaces/category-interfaces';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-dashboard-category',
  templateUrl: './dashboard-category.component.html',
  styleUrls: ['./dashboard-category.component.css']
})
export class DashboardCategoryComponent {
//  categories: CategoryResponseDto[] = [];
//   tenantId = 1;
//   currentPage = 1;
//   pageSize = 10;
//   totalCount = 0;
//   isLoading = false;

//   constructor(
//     private categoryService: CategoryService,
//     private message: NzMessageService
//   ) {}

//   ngOnInit() {
//     this.loadCategories();
//   }

//   loadCategories() {
//     this.isLoading = true;
//     this.categoryService
//       .getCategoriesByTenant(this.tenantId, this.currentPage, this.pageSize)
//       .subscribe({
//         next: (response) => {
//           this.isLoading = false;
//           if (response.success && response.data) {
//             this.categories = response.data.items;
//             this.totalCount = response.data.totalCount;
//           }
//         },
//         error: (err) => {
//           this.isLoading = false;
//           console.error('Load Error:', err);
//           this.message.error('Failed to load categories.');
//         }
//       });
//   }

//   onTenantChange() {
//     this.currentPage = 1;
//     this.loadCategories();
//   }

//   onPageChange(page: number) {
//     this.currentPage = page;
//     this.loadCategories();
//   }

//   deleteCategory(id: number) {
//     this.categoryService.deleteCategory(id).subscribe({
//       next: (response) => {
//         if (response.success) {
//           this.message.success('Category deleted successfully');
//           this.loadCategories();
//         } else {
//           this.message.error('Failed to delete category');
//         }
//       },
//       error: (err) => {
//         console.error('Delete Error:', err);
//         this.message.error('Server error occurred. Please try again.');
//       }
//     });
//   }




categories: CategoryResponseDto[] = [];
  tenantId!: number;
  currentPage = 1;
  pageSize = 10;
  totalCount = 0;
  isLoading = false;

  constructor(
    private categoryService: CategoryService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    // ✅ localStorage se tenantId uthao
    const user = JSON.parse(localStorage.getItem('user')!);
    this.tenantId = user.tenantId;
    this.loadCategories();
  }

  loadCategories() {
    this.isLoading = true;
    this.categoryService.getCategoriesByTenant(this.tenantId, this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success && response.data) {
          this.categories = response.data.items;
          this.totalCount = response.data.totalCount;
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.message.error('Failed to load categories.');
      }
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadCategories();
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe({
      next: (response) => {
        if (response.success) {
          this.message.success('Category deleted successfully');
          this.loadCategories();
        } else {
          this.message.error('Failed to delete category');
        }
      },
      error: () => this.message.error('Server error occurred.')
    });
  }


}
