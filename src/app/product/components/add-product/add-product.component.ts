import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CategoryResponseDto } from 'src/app/category/interfaces/category-interfaces';
import { CategoryService } from 'src/app/category/services/category.service';


// ─── CLASS SE BAHAR — FILE LEVEL PE ───────────────────────────────────────────

const SIZE_GROUPS = {
  kids: [
    '0–3 M','3–6 M','6–12 M',
    '1–2 Y','2–3 Y','3–4 Y','4–5 Y','5–6 Y','6–7 Y','7–8 Y','8–10 Y','10–12 Y',
    'XS','S','M','L'
  ],
  women: [
    'XS','S','M','L','XL','XXL','3XL','4XL','5XL',
    '6','8','10','12','14','16','18',
    'Free Size'
  ],
  bra: [
    '28A','28B','28C','28D',
    '30A','30B','30C','30D',
    '32A','32B','32C','32D','32DD',
    '34A','34B','34C','34D','34DD',
    '36B','36C','36D',
    '38B','38C','38D',
    'Free Size'
  ],
  undergarments: ['XS','S','M','L','XL','XXL','3XL','Free Size'],
  perfume: ['5 ml','10 ml','15 ml','20 ml','25 ml','30 ml','50 ml','75 ml','100 ml','125 ml','150 ml','200 ml'],
  beauty: [
    '5 ml','10 ml','15 ml','20 ml','30 ml','50 ml','75 ml','100 ml','150 ml','200 ml','250 ml','500 ml',
    '5 g','10 g','15 g','30 g','50 g','100 g'
  ]
};

const allSizes = [
  { label: '── Kids ──',                  value: '__kids__', disabled: true },
  ...SIZE_GROUPS.kids.map((s: string)          => ({ label: s,          value: s })),
  { label: '── Women Clothing ──',         value: '__women__', disabled: true },
  ...SIZE_GROUPS.women.map((s: string)         => ({ label: s,          value: s })),
  { label: '── Bra ──',                   value: '__bra__', disabled: true },
  ...SIZE_GROUPS.bra.map((s: string)           => ({ label: `Bra ${s}`, value: `Bra-${s}` })),
  { label: '── Undergarments / Lingerie ──', value: '__ug__', disabled: true },
  ...SIZE_GROUPS.undergarments.map((s: string) => ({ label: s,          value: `UG-${s}` })),
  { label: '── Fragrance / Perfume ──',   value: '__perf__', disabled: true },
  ...SIZE_GROUPS.perfume.map((s: string)       => ({ label: s,          value: `Perf-${s}` })),
  { label: '── Skincare / Beauty ──',     value: '__beauty__', disabled: true },
  ...SIZE_GROUPS.beauty.map((s: string)        => ({ label: s,          value: `Beauty-${s}` })),
];

const ALL_SIZE_OPTIONS = allSizes;

const ALL_COLOR_OPTIONS = [
  { label: 'White',          value: 'White' },
  { label: 'Cream',          value: 'Cream' },
  { label: 'Linen',          value: 'Linen' },
  { label: 'Beige',          value: 'Beige' },
  { label: 'Off White',      value: 'Off White' },
  { label: 'Baby Pink',      value: 'Baby Pink' },
  { label: 'Hot Pink',       value: 'Hot Pink' },
  { label: 'Deep Pink',      value: 'Deep Pink' },
  { label: 'Magenta',        value: 'Magenta' },
  { label: 'Crimson',        value: 'Crimson' },
  { label: 'Red',            value: 'Red' },
  { label: 'Maroon',         value: 'Maroon' },
  { label: 'Dark Red',       value: 'Dark Red' },
  { label: 'Lavender',       value: 'Lavender' },
  { label: 'Lilac',          value: 'Lilac' },
  { label: 'Purple',         value: 'Purple' },
  { label: 'Violet',         value: 'Violet' },
  { label: 'Indigo',         value: 'Indigo' },
  { label: 'Dark Plum',      value: 'Dark Plum' },
  { label: 'Baby Blue',      value: 'Baby Blue' },
  { label: 'Sky Blue',       value: 'Sky Blue' },
  { label: 'Dodger Blue',    value: 'Dodger Blue' },
  { label: 'Royal Blue',     value: 'Royal Blue' },
  { label: 'Dark Blue',      value: 'Dark Blue' },
  { label: 'Navy',           value: 'Navy' },
  { label: 'Mint Green',     value: 'Mint Green' },
  { label: 'Lime Green',     value: 'Lime Green' },
  { label: 'Forest Green',   value: 'Forest Green' },
  { label: 'Dark Green',     value: 'Dark Green' },
  { label: 'Sea Green',      value: 'Sea Green' },
  { label: 'Olive',          value: 'Olive' },
  { label: 'Light Yellow',   value: 'Light Yellow' },
  { label: 'Gold',           value: 'Gold' },
  { label: 'Orange',         value: 'Orange' },
  { label: 'Dark Orange',    value: 'Dark Orange' },
  { label: 'Tomato',         value: 'Tomato' },
  { label: 'Burnt Orange',   value: 'Burnt Orange' },
  { label: 'Nude',           value: 'Nude' },
  { label: 'Tan',            value: 'Tan' },
  { label: 'Camel',          value: 'Camel' },
  { label: 'Bronze',         value: 'Bronze' },
  { label: 'Brown',          value: 'Brown' },
  { label: 'Dark Brown',     value: 'Dark Brown' },
  { label: 'Silver',         value: 'Silver' },
  { label: 'Gray',           value: 'Gray' },
  { label: 'Dark Gray',      value: 'Dark Gray' },
  { label: 'Charcoal',       value: 'Charcoal' },
  { label: 'Black',          value: 'Black' },
  { label: 'Pale Turquoise', value: 'Pale Turquoise' },
  { label: 'Turquoise',      value: 'Turquoise' },
  { label: 'Teal',           value: 'Teal' },
  { label: 'Dark Teal',      value: 'Dark Teal' },
];



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

    // ✅ Class properties — file-level constants ko reference kar rahe hain
  sizeOptions  = ALL_SIZE_OPTIONS;
  colorOptions = ALL_COLOR_OPTIONS;


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