import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SectionDataService } from '../../service/section-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-add-section-data',
  templateUrl: './add-section-data.component.html',
  styleUrls: ['./add-section-data.component.css']
})
export class AddSectionDataComponent {
sectionDataForm!: FormGroup;
  isSubmitting = false;
  sectionId!: number;

  constructor(
    private fb: FormBuilder,
    private sectionDataService: SectionDataService,
    private message: NzMessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // sectionId query param se lo
    this.route.queryParams.subscribe(params => {
      this.sectionId = +params['sectionId'] || 0;
    });

    this.sectionDataForm = this.fb.group({
      key: ['', Validators.required],
      value: ['']
    });
  }

  onSubmit() {
    if (this.sectionDataForm.invalid) return;

    this.isSubmitting = true;

    // sectionId automatically attach
    const payload = {
      ...this.sectionDataForm.value,
      sectionId: this.sectionId
    };

    this.sectionDataService.createSectionData(payload).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        if (res.success) 
          {
          this.message.success('Section data added successfully');
          // back to dashboard with same sectionId
          this.router.navigate(['/section-data/dashboard'], {
            queryParams: { sectionId: this.sectionId }
          });
        } else {
          this.message.error(res.message || 'Failed to create');
        }
      },
      error: () => {
        this.isSubmitting = false;
        this.message.error('Server error occurred.');
      }
    });
  }


}

//   onSubmit() {
//   if (this.sectionDataForm.invalid) return;

//   this.isSubmitting = true;

//   const formValue = this.sectionDataForm.value;

//   const payload = {
//     sectionId: this.sectionId,
//     key: String(formValue.key).trim(),
//     value: formValue.value?.trim() || null
//   };

//   console.log("FINAL PAYLOAD =>", payload); // 🔥 DEBUG

//   this.sectionDataService.createSectionData(payload).subscribe({
//     next: (res) => {
//       this.isSubmitting = false;

//       if (res.success) {
//         this.message.success('Section data added successfully');

//         this.router.navigate(['/section-data/dashboard'], {
//           queryParams: { sectionId: this.sectionId }
//         });
//       } else {
//         this.message.error(res.message || 'Failed to create');
//       }
//     },
//     error: () => {
//       this.isSubmitting = false;
//       this.message.error('Server error occurred.');
//     }
//   });
// }
