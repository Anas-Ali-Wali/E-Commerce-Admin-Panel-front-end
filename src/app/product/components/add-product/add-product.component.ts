import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CategoryResponseDto } from 'src/app/category/interfaces/category-interfaces';
import { CategoryService } from 'src/app/category/services/category.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup;
  isSubmitting = false;
  categories: CategoryResponseDto[] = [];
  selectedFile: File | null = null;
  previewUrl: string | null = null;

  availableSizes: string[] = [
    'XS','S','M','L','XL','2XL','3XL',
    '28','30','32','34','36','38','40',
    '32B','34B','36B','38B','32C','34C','36C','38C',
    '2-3Y','4-5Y','6-7Y','8-9Y','10-11Y','12-13Y'
  ];

  availableColors: string[] = [
    'Black','White','Beige','Nude','Pink','Red',
    'Blue','Green','Yellow','Mint','Brown','Grey',
    'Navy','Purple','Orange','Maroon'
  ];

  sizeOptions = this.availableSizes.map(s => ({ label: s, value: s }));
  colorOptions = this.availableColors.map(c => ({ label: c, value: c }));

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private message: NzMessageService
  ) {
    this.productForm = this.fb.group({
      name:        ['', Validators.required],
      description: [''],
      price:       [null, Validators.required],
      categoryId:  [null],
      stockQty:    [null, Validators.required],
      sku:         [''],
      brand:       [''],
      sizes:       [[]],
      colors:      [[]]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.categoryService.getAllCategoriesByTenant(user.tenantId).subscribe({
      next: (res) => {
        if (res.success && res.data) this.categories = res.data.items;
      },
      error: () => this.message.error('Failed to load categories.')
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => this.previewUrl = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (!this.productForm.valid) {
      Object.values(this.productForm.controls).forEach(c => {
        c.markAsDirty();
        c.updateValueAndValidity({ onlySelf: true });
      });
      return;
    }

    const v = this.productForm.value;
    console.log('SIZES:', v.sizes);
    console.log('COLORS:', v.colors);

    this.isSubmitting = true;
    const user = JSON.parse(localStorage.getItem('user')!);
    const formData = new FormData();

    formData.append('tenantId',    user.tenantId);
    formData.append('name',        v.name);
    formData.append('description', v.description || '');
    formData.append('price',       v.price);
    formData.append('stockQty',    v.stockQty);

    if (v.categoryId)    formData.append('categoryId', v.categoryId);
    if (v.sku?.trim())   formData.append('sku',         v.sku.trim());
    if (v.brand?.trim()) formData.append('brand',       v.brand.trim());

    // ✅ Form se directly sizes/colors
    if (v.sizes?.length > 0)
      v.sizes.forEach((s: string) => formData.append('sizes', s));

    if (v.colors?.length > 0)
      v.colors.forEach((c: string) => formData.append('colors', c));

    if (this.selectedFile) formData.append('image', this.selectedFile);

    this.productService.createProduct(formData).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        if (res.success) {
          this.message.success('Product created successfully');
          this.productForm.reset({ sizes: [], colors: [] });
          this.selectedFile = null;
          this.previewUrl   = null;
        } else {
          this.message.error(res.message || 'Failed to create product');
        }
      },
      error: () => {
        this.isSubmitting = false;
        this.message.error('Server error occurred.');
      }
    });
  }
}