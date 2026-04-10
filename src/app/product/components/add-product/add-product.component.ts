import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ProductCreateRequestDto } from '../../interfaces/product-interfaces';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CategoryResponseDto } from 'src/app/category/interfaces/category-interfaces';
import { CategoryService } from 'src/app/category/services/category.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
//  productForm: FormGroup;
//   isSubmitting = false;

//   constructor(
//     private fb: FormBuilder,
//     private productService: ProductService,
//     private message: NzMessageService
//   ) {
//     this.productForm = this.fb.group({
//       tenantId: [null, Validators.required],
//       name: ['', Validators.required],
//       description: [''],
//       price: [null, Validators.required],
//       imageUrl: [''],
//       categoryId: [null],
//       stockQty: [null, Validators.required]
//     });
//   }

//   onSubmit() {
//     if (this.productForm.valid) {
//       this.isSubmitting = true;
//       const request: ProductCreateRequestDto = this.productForm.value;

//       this.productService.createProduct(request).subscribe({
//         next: (response) => {
//           this.isSubmitting = false;
//           if (response.success) {
//             this.message.success('Product created successfully');
//             this.productForm.reset();
//           } else {
//             this.message.error(response.message || 'Failed to create product');
//           }
//         },
//         error: (err) => {
//           this.isSubmitting = false;
//           console.error('API ERROR:', err);
//           this.message.error('Server error occurred. Please try again.');
//         }
//       });
//     } else {
//       Object.values(this.productForm.controls).forEach(control => {
//         if (control.invalid) {
//           control.markAsDirty();
//           control.updateValueAndValidity({ onlySelf: true });
//         }
//       });
//     }
//   }


productForm: FormGroup;
  isSubmitting = false;
  categories: CategoryResponseDto[] = [];  // ✅

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,  // ✅
    private message: NzMessageService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [null, Validators.required],
      imageUrl: [''],
      categoryId: [null],
      stockQty: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.loadCategories();  // ✅
  }

  loadCategories() {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.categoryService.getAllCategoriesByTenant(user.tenantId).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.categories = response.data.items;
        }
      },
      error: () => this.message.error('Failed to load categories.')
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.isSubmitting = true;

      const user = JSON.parse(localStorage.getItem('user')!);
      const payload: ProductCreateRequestDto = {
        ...this.productForm.value,
        tenantId: user.tenantId
      };

      this.productService.createProduct(payload).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          if (response.success) {
            this.message.success('Product created successfully');
            this.productForm.reset();
          } else {
            this.message.error(response.message || 'Failed to create product');
          }
        },
        error: (err) => {
          this.isSubmitting = false;
          this.message.error('Server error occurred. Please try again.');
        }
      });
    } else {
      Object.values(this.productForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}
