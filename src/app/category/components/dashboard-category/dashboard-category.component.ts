import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { CategoryResponseDto } from '../../interfaces/category-interfaces';

@Component({
  selector: 'app-dashboard-category',
  templateUrl: './dashboard-category.component.html',
  styleUrls: ['./dashboard-category.component.css']
})
export class DashboardCategoryComponent {
  // categories: CategoryResponseDto[] = [];
  // tenantId = 1;
  // currentPage = 1;
  // pageSize = 10;
  // totalCount = 0;

  // constructor(private categoryService: CategoryService) { }

  // loadCategories() {
  //   this.categoryService.getCategoriesByTenant(this.tenantId, this.currentPage, this.pageSize).subscribe(response => {
  //     if (response.success && response.data) {
  //       this.categories = response.data.items;
  //       this.totalCount = response.data.totalCount;
  //     }
  //   });
  // }

  // onTenantChange() {
  //   this.currentPage = 1;
  //   this.loadCategories();
  // }

  // onPageChange(page: number) {
  //   this.currentPage = page;
  //   this.loadCategories();
  // }

  // deleteCategory(id: number) {
  //   if (confirm('Are you sure?')) {
  //     this.categoryService.deleteCategory(id).subscribe(response => {
  //       if (response.success) {
  //         this.loadCategories();
  //       }
  //     });
  //   }
  // }


  categories: CategoryResponseDto[] = [];
  tenantId = 1;
  currentPage = 1;
  pageSize = 10;
  totalCount = 0;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService
      .getCategoriesByTenant(this.tenantId, this.currentPage, this.pageSize)
      .subscribe({
        next: (response) => {
          if (response.success && response.data) {
            this.categories = response.data.items;
            this.totalCount = response.data.totalCount;
          }
        },
        error: (err) => {
          console.error('Load Error:', err);
        }
      });
  }

  onTenantChange() {
    this.currentPage = 1;
    this.loadCategories();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadCategories();
  }

  deleteCategory(id: number) {
    if (confirm('Are you sure?')) {
      this.categoryService.deleteCategory(id).subscribe({
        next: (response) => {
          if (response.success) {
            this.loadCategories();
          }
        },
        error: (err) => {
          console.error('Delete Error:', err);
        }
      });
    }
  }

}
