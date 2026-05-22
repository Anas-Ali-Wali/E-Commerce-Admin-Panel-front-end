import { Component } from '@angular/core';
import { ProductImageResponseDto, ProductResponseDto } from '../../interfaces/product-interfaces';
import { ActivatedRoute } from '@angular/router';
import { ProductImageService } from '../../services/product-image.service';
import { ProductService } from '../../services/product.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { environment } from 'src/Environment/environment';

@Component({
  selector: 'app-product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.css']
})
export class ProductImagesComponent {
productId!: number;
  product!: ProductResponseDto;
  images: ProductImageResponseDto[] = [];
  isLoading = false;
  isUploading = false;

  // Upload form
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  colorName: string = '';
  isPrimary: boolean = false;

  baseUrl = environment.apiUrl.replace('/api', '');


  constructor(
    private route: ActivatedRoute,
    private imageService: ProductImageService,
    private productService: ProductService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!;
    this.loadProduct();
    this.loadImages();
  }

  // Product info load karo
  loadProduct(): void {
    this.productService.getProductById(this.productId).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.product = res.data;
        }
      }
    });
  }

  // Sari images load karo
  loadImages(): void {
    this.isLoading = true;
    this.imageService.getImagesByProduct(this.productId).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.success && res.data) {
          this.images = res.data;
        }
      },
      error: () => {
        this.isLoading = false;
        this.message.error('Failed to load images.');
      }
    });
  }

  // File select karo
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => this.previewUrl = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  // Image upload karo
  uploadImage(): void {
    if (!this.selectedFile) {
      this.message.warning('Please select an image first.');
      return;
    }

    this.isUploading = true;
    const formData = new FormData();
    formData.append('productId', this.productId.toString());
    formData.append('image', this.selectedFile);
    formData.append('colorName', this.colorName || '');
    formData.append('isPrimary', this.isPrimary.toString());
    formData.append('orderNo', (this.images.length + 1).toString());

    this.imageService.addImage(formData).subscribe({
      next: (res) => {
        this.isUploading = false;
        if (res.success) {
          this.message.success('Image added successfully!');
          // Reset form
          this.selectedFile = null;
          this.previewUrl = null;
          this.colorName = '';
          this.isPrimary = false;
          // Images reload karo
          this.loadImages();
        } else {
          this.message.error(res.message || 'Failed to add image.');
        }
      },
      error: () => {
        this.isUploading = false;
        this.message.error('Server error occurred.');
      }
    });
  }

  // Image delete karo
  deleteImage(imageId: number): void {
    this.imageService.deleteImage(imageId).subscribe({
      next: (res) => {
        if (res.success) {
          this.message.success('Image deleted.');
          this.loadImages();
        } else {
          this.message.error('Failed to delete image.');
        }
      },
      error: () => this.message.error('Server error occurred.')
    });
  }

  // Primary set karo
  setPrimary(imageId: number): void {
    this.imageService.setPrimary(imageId, this.productId).subscribe({
      next: (res) => {
        if (res.success) {
          this.message.success('Primary image updated!');
          this.loadImages();
        } else {
          this.message.error('Failed to update primary image.');
        }
      },
      error: () => this.message.error('Server error occurred.')
    });
  }

  // File input reset karo
  clearFile(): void {
    this.selectedFile = null;
    this.previewUrl = null;
  }

}
