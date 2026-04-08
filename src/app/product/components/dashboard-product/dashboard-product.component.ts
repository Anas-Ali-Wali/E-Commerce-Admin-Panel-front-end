import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductResponseDto } from '../../interfaces/product-interfaces';

@Component({
  selector: 'app-dashboard-product',
  templateUrl: './dashboard-product.component.html',
  styleUrls: ['./dashboard-product.component.css']
})
export class DashboardProductComponent {
  products: ProductResponseDto[] = [];
  tenantId = 1;
  currentPage = 1;
  pageSize = 10;
  totalCount = 0;

  constructor(private productService: ProductService) { }

  loadProducts() {
    this.productService.getProductsByTenant(this.tenantId, this.currentPage, this.pageSize).subscribe(response => {
      if (response.success && response.data) {
        this.products = response.data.items;
        this.totalCount = response.data.totalCount;
      }
    });
  }

  onTenantChange() {
    this.currentPage = 1;
    this.loadProducts();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadProducts();
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure?')) {
      this.productService.deleteProduct(id).subscribe(response => {
        if (response.success) {
          this.loadProducts();
        }
      });
    }
  }
}
