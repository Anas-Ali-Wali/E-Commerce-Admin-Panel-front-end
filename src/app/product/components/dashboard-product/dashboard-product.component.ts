  import { Component } from '@angular/core';
  import { ProductService } from '../../services/product.service';
  import { ProductResponseDto } from '../../interfaces/product-interfaces';
  import { NzMessageService } from 'ng-zorro-antd/message';

  @Component({
    selector: 'app-dashboard-product',
    templateUrl: './dashboard-product.component.html',
    styleUrls: ['./dashboard-product.component.css']
  })
  export class DashboardProductComponent {

//   products: ProductResponseDto[] = [];
//   originalProducts: ProductResponseDto[] = []; // 🔥 important
// searchText: string = '';
//   tenantId!: number;
//   currentPage = 1;
//   pageSize = 10;
//   totalCount = 0;
//   isLoading = false;
  


//   constructor(
//     private productService: ProductService,
//     private message: NzMessageService
//   ) {}

//   ngOnInit() {
//     // ✅ localStorage se tenantId uthao
//     const user = JSON.parse(localStorage.getItem('user')!);
//     this.tenantId = user.tenantId;
//     this.loadProducts();
//   }

//   // loadProducts() {
//   //   this.isLoading = true;
//   //   this.productService.getProductsByTenant(this.tenantId, this.currentPage, this.pageSize).subscribe({
//   //     next: (response) => {
//   //       this.isLoading = false;
//   //       if (response.success && response.data) {
//   //         this.products = response.data.items;
//   //         this.totalCount = response.data.totalCount;
//   //       }
//   //     },
//   //     error: () => {
//   //       this.isLoading = false;
//   //       this.message.error('Failed to load products.');
//   //     }
//   //   });
//   // }


//   loadProducts() {
//   this.isLoading = true;

//   this.productService.getProductsByTenant(this.tenantId).subscribe({
//     next: (response) => {
//       this.isLoading = false;

//       if (response.success && response.data) {
//         this.originalProducts = response.data.items;
//         this.products = [...this.originalProducts];
//         this.totalCount = this.products.length; // frontend pagination
//       }
//     },
//     error: () => {
//       this.isLoading = false;
//       this.message.error('Failed to load products.');
//     }
//   });
// }

// onSearch() {
//   const value = this.searchText.toLowerCase();

//   this.products = this.originalProducts.filter(item =>
//     Object.values(item).some(val =>
//       val && val.toString().toLowerCase().includes(value)
//     )
//   );
// }

//   onPageChange(page: number) {
//     this.currentPage = page;
//     this.loadProducts();
//   }

//   deleteProduct(id: number) {
//     this.productService.deleteProduct(id).subscribe({
//       next: (response) => {
//         if (response.success) {
//           this.message.success('Product deleted successfully');
//           this.loadProducts();
//         } else {
//           this.message.error('Failed to delete product');
//         }
//       },
//       error: () => this.message.error('Server error occurred.')
//     });
//   }






products: ProductResponseDto[] = [];
  originalProducts: ProductResponseDto[] = [];
  searchText = '';
  tenantId!: number;
  currentPage = 1;
  pageSize = 10;
  totalCount = 0;
  isLoading = false;
  Math = Math;

  showDeleteModal = false;
  pendingDeleteId!: number;

  constructor(
    private productService: ProductService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.tenantId = user.tenantId;
    this.loadProducts();
  }

  get pagedProducts(): ProductResponseDto[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.products.slice(start, start + this.pageSize);
  }

  loadProducts() {
    this.isLoading = true;
    this.productService.getProductsByTenant(this.tenantId).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success && response.data) {
          this.originalProducts = response.data.items;
          this.products = [...this.originalProducts];
          this.totalCount = this.products.length;
        }
      },
      error: () => {
        this.isLoading = false;
        this.message.error('Failed to load products.');
      }
    });
  }

  onSearch() {
    const value = this.searchText.toLowerCase();
    this.products = this.originalProducts.filter(item =>
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
    const total = Math.ceil(this.products.length / this.pageSize);
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  confirmDelete(id: number) {
    this.pendingDeleteId = id;
    this.showDeleteModal = true;
  }

  deleteProduct() {
    this.showDeleteModal = false;
    this.productService.deleteProduct(this.pendingDeleteId).subscribe({
      next: (response) => {
        if (response.success) {
          this.message.success('Product deleted successfully');
          this.loadProducts();
        } else {
          this.message.error('Failed to delete product');
        }
      },
      error: () => this.message.error('Server error occurred.')
    });
  }

  }














    // products: ProductResponseDto[] = [];
  //   tenantId = 1;
  //   currentPage = 1;
  //   pageSize = 10;
  //   totalCount = 0;
  //   isLoading = false;

  //   constructor(
  //     private productService: ProductService,
  //     private message: NzMessageService
  //   ) {}

  //   ngOnInit() {
  //     this.loadProducts();
  //   }

  //   loadProducts() {
  //     this.isLoading = true;
  //     this.productService.getProductsByTenant(this.tenantId, this.currentPage, this.pageSize).subscribe({
  //       next: (response) => {
  //         this.isLoading = false;
  //         if (response.success && response.data) {
  //           this.products = response.data.items;
  //           this.totalCount = response.data.totalCount;
  //         }
  //       },
  //       error: (err) => {
  //         this.isLoading = false;
  //         console.error('Load Error:', err);
  //         this.message.error('Failed to load products.');
  //       }
  //     });
  //   }

  //   onTenantChange() {
  //     this.currentPage = 1;
  //     this.loadProducts();
  //   }

  //   onPageChange(page: number) {
  //     this.currentPage = page;
  //     this.loadProducts();
  //   }

  //   deleteProduct(id: number) {
  //     this.productService.deleteProduct(id).subscribe({
  //       next: (response) => {
  //         if (response.success) {
  //           this.message.success('Product deleted successfully');
  //           this.loadProducts();
  //         } else {
  //           this.message.error('Failed to delete product');
  //         }
  //       },
  //       error: (err) => {
  //         console.error('Delete Error:', err);
  //         this.message.error('Server error occurred. Please try again.');
  //       }
  //     });
  //   }

