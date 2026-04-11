import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SectionService } from '../../service/section.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-section',
  templateUrl: './add-section.component.html',
  styleUrls: ['./add-section.component.css']
})
export class AddSectionComponent {
sectionForm!: FormGroup;
  isSubmitting = false;
  pageId!: number;

  sectionTypes = ['Hero', 'Products', 'Banner', 'Testimonial', 'Footer'];

  constructor(
    private fb: FormBuilder,
    private sectionService: SectionService,
    private message: NzMessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // ngOnInit() {
  //   this.route.queryParams.subscribe(params => {
  //     this.pageId = +params['pageId'] || 0;
  //   });

  //   this.sectionForm = this.fb.group({
  //     type: [null, Validators.required],
  //     orderNo: [1, Validators.required],
  //     status: [true]
  //   });
  // }

  ngOnInit() {
  this.route.queryParams.subscribe(params => {
    this.pageId = +params['pageId'] || 0;

    // ✅ pageId = 0 ho to page dashboard pe bhejo
    if (this.pageId === 0) {
      this.message.warning('Please select a page first!');
      this.router.navigate(['/page/dashboard']);
      return;
    }
  });

  this.sectionForm = this.fb.group({
    type: [null, Validators.required],
    orderNo: [1, Validators.required],
    status: [true]
  });
}

  onSubmit() {
    if (this.sectionForm.invalid) return;

    this.isSubmitting = true;

    const payload = {
      ...this.sectionForm.value,
      pageId: this.pageId
    };

    this.sectionService.createSection(payload).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        if (res.success) {
          this.message.success('Section created successfully');
          this.router.navigate(['/section/dashboard'], {
            queryParams: { pageId: this.pageId }
          });
        } else {
          this.message.error(res.message || 'Failed to create section');
        }
      },
      error: () => {
        this.isSubmitting = false;
        this.message.error('Server error occurred.');
      }
    });
  }

}
