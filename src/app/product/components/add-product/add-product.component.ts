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

productForm: FormGroup;
  isSubmitting = false;
  categories: CategoryResponseDto[] = [];  // ✅
selectedFile: File | null = null;
previewUrl: string | null = null;

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


  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // fallback image (optional)
  onImageError(event: any) {
    event.target.src = 'https://placehold.co/150x150?text=No+Image';
  }




onSubmit() {

    if (!this.productForm.valid) {
      Object.values(this.productForm.controls).forEach(control => {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      });
      return;
    }

    this.isSubmitting = true;

    const user = JSON.parse(localStorage.getItem('user')!);

    const formData = new FormData();

    formData.append('tenantId', user.tenantId);
    formData.append('name', this.productForm.value.name);
    formData.append('description', this.productForm.value.description || '');
    formData.append('price', this.productForm.value.price);
    formData.append('stockQty', this.productForm.value.stockQty);

    if (this.productForm.value.categoryId) {
      formData.append('categoryId', this.productForm.value.categoryId);
    }

    // ✅ FILE ATTACH
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.productService.createProduct(formData).subscribe({
      next: (response) => {
        this.isSubmitting = false;

        if (response.success) {
          this.message.success('Product created successfully');

          this.productForm.reset();
          this.selectedFile = null;
          this.previewUrl = null;

        } else {
          this.message.error(response.message || 'Failed to create product');
        }
      },
      error: () => {
        this.isSubmitting = false;
        this.message.error('Server error occurred. Please try again.');
      }
    });
  }

}




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


//   onImageError(event: any) {
//   event.target.src = 'assets/images/no-image.png'; // fallback image
//   // ya simple placeholder:
//   event.target.src = 'https://placehold.co/150x150?text=No+Image';
// }