import { Component } from '@angular/core';
import { TenantSliderResponse } from '../../interface/tenant-slider';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TenantSliderService } from '../../services/tenant-slider.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/Environment/environment';

@Component({
  selector: 'app-website-slider',
  templateUrl: './website-slider.component.html',
  styleUrls: ['./website-slider.component.css']
})
export class WebsiteSliderComponent {
  sliders: TenantSliderResponse[] = [];
  form!: FormGroup;
  loading = false;
  saving = false;
  editingId: number | null = null;
  successMsg = '';
  errorMsg = '';
  tenantId = Number(localStorage.getItem('tenantId')) || 1;
 
  // Image upload state
  imageUploading = false;
  imagePreview = '';
 
  // ── ImgBB free API key — imgbb.com pe account banao, free milti hai ──
  // private IMGBB_API_KEY = 'YOUR_IMGBB_API_KEY';

  private IMGBB_API_KEY = environment.imgbbApiKey;

 
  constructor(
    private fb: FormBuilder,
    private service: TenantSliderService,
    private http: HttpClient
  ) {}
 
  ngOnInit(): void {
    this.initForm();
    this.loadSliders();
  }
 
  initForm(): void {
    this.form = this.fb.group({
      imageUrl:       [''],
      title:          [''],
      subtitle:       [''],
      buttonText:     [''],
      buttonLink:     [''],
      orderNo:        [1],
      isActive:       [true],
      layoutType:     ['full-image'],
      bgColor:        ['#1a1a2e'],
      textColor:      ['#ffffff'],
      overlayOpacity: [50],
          isPresetImage:  [false]  // ← NEW

    });
 
    // imageUrl change hone par preview update karo
    this.form.get('imageUrl')!.valueChanges.subscribe(url => {
      if (url && url.startsWith('http')) {
        this.imagePreview = url;
      }
    });
  }
 
  // ── IMAGE FILE SELECT — ye function file input se call hoga ──
  async onImageFileSelect(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (!input.files || !input.files[0]) return;
 
    const file = input.files[0];
 
    // Validation
    if (!file.type.startsWith('image/')) {
      this.errorMsg = 'Sirf image files allowed hain (jpg, png, webp)';
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      this.errorMsg = 'Image size 5MB se kam honi chahiye';
      return;
    }
 
    this.imageUploading = true;
    this.errorMsg = '';
 
    try {
      const url = await this.uploadToImgBB(file);
      this.form.patchValue({ imageUrl: url });
      this.imagePreview = url;
      this.imageUploading = false;
    } catch (err) {
      this.errorMsg = 'Image upload failed. URL directly paste karein.';
      this.imageUploading = false;
    }
  }
 
  // ── ImgBB UPLOAD ──
  private async uploadToImgBB(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('image', file);
 
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${this.IMGBB_API_KEY}`,
      { method: 'POST', body: formData }
    );
 
    if (!response.ok) throw new Error('Upload failed');
 
    const data = await response.json();
    return data.data.url; // hosted URL — database mein yahi save hogi
  }
 
  // ── URL manually paste karne par preview ──
  onUrlInput(event: Event): void {
    const url = (event.target as HTMLInputElement).value;
    if (url && url.startsWith('http')) {
      this.imagePreview = url;
    } else {
      this.imagePreview = '';
    }
  }
 
  loadSliders(): void {
    this.loading = true;
    this.service.getAllSliders(this.tenantId).subscribe({
      next: (res) => {
        this.sliders = res.success && res.data ? res.data : [];
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }
 
  // onSubmit(): void {
  //   if (this.form.invalid) return;
 
  //   // base64 check — galti se base64 na jaye
  //   const imageUrl = this.form.value.imageUrl || '';
  //   if (imageUrl.startsWith('data:')) {
  //     this.errorMsg = 'Base64 image allowed nahi. Pehle file upload karein ya URL paste karein.';
  //     return;
  //   }
 
  //   this.saving = true;
  //   this.successMsg = '';
  //   this.errorMsg = '';
 
  //   if (this.editingId) {
  //     this.service.updateSlider(this.editingId, this.form.value).subscribe({
  //       next: () => {
  //         this.successMsg = 'Slider updated successfully!';
  //         this.resetForm();
  //         this.loadSliders();
  //         this.saving = false;
  //       },
  //       error: () => {
  //         this.errorMsg = 'Error updating slider!';
  //         this.saving = false;
  //       }
  //     });
  //   } else {
  //     this.service.addSlider({
  //       tenantId: this.tenantId,
  //       ...this.form.value
  //     }).subscribe({
  //       next: () => {
  //         this.successMsg = 'Slider added successfully!';
  //         this.resetForm();
  //         this.loadSliders();
  //         this.saving = false;
  //       },
  //       error: () => {
  //         this.errorMsg = 'Error adding slider!';
  //         this.saving = false;
  //       }
  //     });
  //   }
  // }


  onSubmit(): void {
  if (this.form.invalid) return;

  const imageUrl = this.form.value.imageUrl || '';
  const isPreset = this.form.value.isPresetImage;
  const layoutType = this.form.value.layoutType;

  console.log('isPresetImage:', isPreset);  // ← debug
  console.log('imageUrl:', imageUrl);        // ← debug

  if (imageUrl.startsWith('data:')) {
    this.errorMsg = 'Base64 image allowed nahi.';
    return;
  }

  // Image required check (text-only ke ilawa)
  if (layoutType !== 'text-only' && !imageUrl) {
    this.errorMsg = 'Pehle image upload karein ya URL paste karein!';
    return;
  }

  this.saving = true;
  this.successMsg = '';
  this.errorMsg = '';

  if (this.editingId) {
    this.service.updateSlider(this.editingId, this.form.value).subscribe({
      next: () => {
        this.successMsg = 'Slider updated!';
        this.resetForm();
        this.loadSliders();
        this.saving = false;
      },
      error: () => { this.errorMsg = 'Error!'; this.saving = false; }
    });
  } else {
    const payload = {
      tenantId: this.tenantId,
      ...this.form.value
    };
    console.log('Final payload:', payload);  // ← debug

    this.service.addSlider(payload).subscribe({
      next: () => {
        this.successMsg = 'Slider added!';
        this.resetForm();
        this.loadSliders();
        this.saving = false;
      },
      error: () => { this.errorMsg = 'Error!'; this.saving = false; }
    });
  }
}
 
  onEdit(slider: TenantSliderResponse): void {
    this.editingId = slider.sliderId;
    this.imagePreview = slider.imageUrl || '';
    this.form.patchValue({
      imageUrl:       slider.imageUrl       || '',
      title:          slider.title          || '',
      subtitle:       slider.subtitle       || '',
      buttonText:     slider.buttonText     || '',
      buttonLink:     slider.buttonLink     || '',
      orderNo:        slider.orderNo,
      isActive:       slider.isActive,
      layoutType:     slider.layoutType     || 'full-image',
      bgColor:        slider.bgColor        || '#1a1a2e',
      textColor:      slider.textColor      || '#ffffff',
      overlayOpacity: slider.overlayOpacity ?? 50,
      isPresetImage:  slider.isPresetImage  ?? false  // ← NEW

    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
 
  onDelete(sliderId: number): void {
    if (!confirm('Are you sure you want to delete this slider?')) return;
    this.service.deleteSlider(sliderId).subscribe({
      next: () => {
        this.successMsg = 'Slider deleted!';
        this.loadSliders();
      },
      error: () => { this.errorMsg = 'Error deleting!'; }
    });
  }
 
  resetForm(): void {
    this.editingId = null;
    this.imagePreview = '';
    this.form.reset({
      orderNo:        1,
      isActive:       true,
      layoutType:     'full-image',
      bgColor:        '#1a1a2e',
      textColor:      '#ffffff',
      overlayOpacity: 50,
          isPresetImage:  false  // ← NEW

    });
  }
 
  get isImageLayout(): boolean {
    return this.form.value.layoutType !== 'text-only';
  }
 
  get isFullImage(): boolean {
    return this.form.value.layoutType === 'full-image';
  }

}
