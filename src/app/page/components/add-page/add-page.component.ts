import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageService } from '../../services/page.service';
import { PageRequestDto } from '../../interfaces/page-interfaces';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent {
 
  pageForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private pageService: PageService,
    private message: NzMessageService
  ) {
    this.pageForm = this.fb.group({
      title: ['', Validators.required],
      slug: ['', Validators.required],
      status: [true]
    });
  }

  onSlugInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const formatted = input.value
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    this.pageForm.get('slug')?.setValue(formatted, { emitEvent: false });
  }

  onSubmit() {
    if (this.pageForm.valid) {
      this.isSubmitting = true;

      // ✅ localStorage se tenantId uthao
      const user = JSON.parse(localStorage.getItem('user')!);
      const payload: PageRequestDto = {
        ...this.pageForm.value,
        tenantId: user.tenantId
      };

      this.pageService.createPage(payload).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          if (response.success) {
            this.message.success('Page created successfully');
            this.pageForm.reset({ status: true });
          } else {
            this.message.error(response.message || 'Failed to create page');
          }
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('API ERROR:', err);
          this.message.error('Server error occurred. Please try again.');
        }
      });
    } else {
      Object.values(this.pageForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}
