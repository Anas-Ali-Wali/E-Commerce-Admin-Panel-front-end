import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageService } from '../../services/page.service';
import { PageRequestDto } from '../../interfaces/page-interfaces';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent {
  pageForm: FormGroup;

  constructor(private fb: FormBuilder, private pageService: PageService) {
    this.pageForm = this.fb.group({
      tenantId: [0, Validators.required],
      title: ['', Validators.required],
      slug: ['', Validators.required],
      status: [true]
    });
  }

  onSubmit() {
    if (this.pageForm.valid) {
      const request: PageRequestDto = this.pageForm.value;
      this.pageService.createPage(request).subscribe(response => {
        if (response.success) {
          alert('Page created successfully');
          this.pageForm.reset();
        } else {
          alert('Error: ' + response.message);
        }
      });
    }
  }
}
