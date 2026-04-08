import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ProductCreateRequestDto } from '../../interfaces/product-interfaces';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      tenantId: [0, Validators.required],
      name: ['', Validators.required],
      description: [''],
      price: [0, Validators.required],
      imageUrl: [''],
      categoryId: [null],
      stockQty: [0, Validators.required]
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const request: ProductCreateRequestDto = this.productForm.value;
      this.productService.createProduct(request).subscribe(response => {
        if (response.success) {
          alert('Product created successfully');
          this.productForm.reset();
        } else {
          alert('Error: ' + response.message);
        }
      });
    }
  }
}
