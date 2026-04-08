import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { CategoryRequestDto } from '../../interfaces/category-interfaces';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  categoryForm: FormGroup;

  constructor(private fb: FormBuilder, private categoryService: CategoryService) {
    this.categoryForm = this.fb.group({
      tenantId: [0, Validators.required],
      name: ['', Validators.required],
      parentCategoryId: [null],
      status: [true]
    });
  }

  onSubmit() {
  if (this.categoryForm.valid) {
    const request: CategoryRequestDto = this.categoryForm.value;

    console.log('Request Payload:', request); // 🔥 debug

    this.categoryService.createCategory(request).subscribe({
      next: (response) => {
        console.log('API Response:', response);

        if (response.success) {
          alert('✅ Category created successfully');
          this.categoryForm.reset({
            tenantId: 1,
            status: true
          });
        } else {
          alert('❌ Error: ' + response.message);
        }
      },
      error: (err) => {
        console.error('API ERROR:', err);
        alert('🚨 Server error aa gaya');
      }
    });
  } else {
    alert('⚠️ Form invalid hai');
  }
}
}
