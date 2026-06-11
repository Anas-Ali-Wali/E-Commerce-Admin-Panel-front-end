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
categories: CategoryResponseDto[] = [];
  originalCategories: CategoryResponseDto[] = [];
  searchText = '';
  tenantId!: number;
  currentPage = 1;
  pageSize = 10;
  isLoading = false;
  showDeleteModal = false;
  deleteTargetId: number | null = null;
  Math = Math;

  constructor(
    private categoryService: CategoryService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.tenantId = user.tenantId;
    this.loadCategories();
  }

  loadCategories() {
  this.isLoading = true;
  this.categoryService.getAllCategoriesByTenant(this.tenantId).subscribe({
    next: (response) => {
      this.isLoading = false;
      console.log('Full response:', response); // ← yeh add karo
      if (response.success && response.data) {
        this.originalCategories = response.data.items; // items ya direct array?
        this.categories = [...this.originalCategories];
        this.currentPage = 1;
      }
    }
  });
}

  onSearch() {
    const value = this.searchText.toLowerCase();
    this.categories = this.originalCategories.filter(item =>
      Object.values(item).some(val =>
        val && val.toString().toLowerCase().includes(value)
      )
    );
    this.currentPage = 1;
  }

  get pagedCategories(): CategoryResponseDto[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.categories.slice(start, start + this.pageSize);
  }

  getPages(): number[] {
    const total = Math.ceil(this.categories.length / this.pageSize);
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  confirmDelete(id: number) {
    this.deleteTargetId = id;
    this.showDeleteModal = true;
  }

  deleteCategory() {
    if (!this.deleteTargetId) return;
    this.categoryService.deleteCategory(this.deleteTargetId).subscribe({
      next: (response) => {
        this.showDeleteModal = false;
        this.deleteTargetId = null;
        if (response.success) {
          this.message.success('Category deleted successfully');
          this.loadCategories();
        } else {
          this.message.error('Failed to delete category');
        }
      },
      error: () => {
        this.showDeleteModal = false;
        this.message.error('Server error occurred.');
      }
    });
  }

}
