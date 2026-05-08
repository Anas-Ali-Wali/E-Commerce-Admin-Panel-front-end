import { Component } from '@angular/core';
import { TenantSliderResponse } from '../../interface/tenant-slider';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TenantSliderService } from '../../services/tenant-slider.service';

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

  constructor(
    private fb: FormBuilder,
    private service: TenantSliderService
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
      overlayOpacity: [50]
    });
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

  onSubmit(): void {
    if (this.form.invalid) return;
    this.saving = true;
    this.successMsg = '';
    this.errorMsg = '';

    if (this.editingId) {
      this.service.updateSlider(this.editingId, this.form.value).subscribe({
        next: () => {
          this.successMsg = 'Slider updated successfully!';
          this.resetForm();
          this.loadSliders();
          this.saving = false;
        },
        error: () => {
          this.errorMsg = 'Error updating slider!';
          this.saving = false;
        }
      });
    } else {
      this.service.addSlider({
        tenantId: this.tenantId,
        ...this.form.value
      }).subscribe({
        next: () => {
          this.successMsg = 'Slider added successfully!';
          this.resetForm();
          this.loadSliders();
          this.saving = false;
        },
        error: () => {
          this.errorMsg = 'Error adding slider!';
          this.saving = false;
        }
      });
    }
  }

  onEdit(slider: TenantSliderResponse): void {
    this.editingId = slider.sliderId;
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
      overlayOpacity: slider.overlayOpacity ?? 50
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
    this.form.reset({
      orderNo:        1,
      isActive:       true,
      layoutType:     'full-image',
      bgColor:        '#1a1a2e',
      textColor:      '#ffffff',
      overlayOpacity: 50
    });
  }

  // Layout check helpers — HTML mein use honge
  get isImageLayout(): boolean {
    return this.form.value.layoutType !== 'text-only';
  }

  get isFullImage(): boolean {
    return this.form.value.layoutType === 'full-image';
  }

}
