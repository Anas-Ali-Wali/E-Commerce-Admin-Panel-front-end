import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { CategoryRequestDto } from '../../interfaces/category-interfaces';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
//  categoryForm: FormGroup;
//   isSubmitting = false;

//   constructor(
//     private fb: FormBuilder,
//     private categoryService: CategoryService,
//     private message: NzMessageService
//   ) {
//     this.categoryForm = this.fb.group({
//       tenantId: [null, Validators.required],
//       name: ['', Validators.required],
//       parentCategoryId: [null],
//       status: [true]
//     });
//   }

//   onSubmit() {
//     if (this.categoryForm.valid) {
//       this.isSubmitting = true;
//       const request: CategoryRequestDto = this.categoryForm.value;

//       this.categoryService.createCategory(request).subscribe({
//         next: (response) => {
//           this.isSubmitting = false;
//           if (response.success) {
//             this.message.success('Category created successfully');
//             this.categoryForm.reset({ tenantId: null, status: true });
//           } else {
//             this.message.error(response.message || 'Failed to create category');
//           }
//         },
//         error: (err) => {
//           this.isSubmitting = false;
//           console.error('API ERROR:', err);
//           this.message.error('Server error occurred. Please try again.');
//         }
//       });
//     } else {
//       Object.values(this.categoryForm.controls).forEach(control => {
//         if (control.invalid) {
//           control.markAsDirty();
//           control.updateValueAndValidity({ onlySelf: true });
//         }
//       });
//     }
//   }


categoryForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private message: NzMessageService
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      parentCategoryId: [null],
      status: [true]
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      this.isSubmitting = true;

      const user = JSON.parse(localStorage.getItem('user')!);
      const payload: CategoryRequestDto = {
        ...this.categoryForm.value,
        tenantId: user.tenantId
      };

      this.categoryService.createCategory(payload).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          if (response.success) {
            this.message.success('Category created successfully');
            this.categoryForm.reset({ status: true });
          } else {
            this.message.error(response.message || 'Failed to create category');
          }
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('API ERROR:', err);
          this.message.error('Server error occurred. Please try again.');
        }
      });
    } else {
      Object.values(this.categoryForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}
