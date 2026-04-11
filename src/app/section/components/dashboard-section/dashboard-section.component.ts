import { Component } from '@angular/core';
import { SectionResponseDto } from '../../interface/section-interfaces';
import { SectionService } from '../../service/section.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard-section',
  templateUrl: './dashboard-section.component.html',
  styleUrls: ['./dashboard-section.component.css']
})
export class DashboardSectionComponent {
sections: SectionResponseDto[] = [];
  originalSections: SectionResponseDto[] = [];
  searchText = '';
  isLoading = false;
  pageId!: number;

  constructor(
    private sectionService: SectionService,
    private message: NzMessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // pageId query param se lo — jab Page dashboard se navigate ho
    this.route.queryParams.subscribe(params => {
      this.pageId = +params['pageId'] || 0;
      if (this.pageId) this.loadSections();
    });
  }

  loadSections() {
    this.isLoading = true;
    this.sectionService.getSectionsByPage(this.pageId).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.success && res.data) {
          this.originalSections = res.data;
          this.sections = [...this.originalSections];
        }
      },
      error: () => {
        this.isLoading = false;
        this.message.error('Failed to load sections.');
      }
    });
  }

  onSearch() {
    const value = this.searchText.toLowerCase();
    this.sections = this.originalSections.filter(item =>
      Object.values(item).some(val =>
        val && val.toString().toLowerCase().includes(value)
      )
    );
  }

  deleteSection(id: number) {
    this.sectionService.deleteSection(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.message.success('Section deleted successfully');
          this.loadSections();
        } else {
          this.message.error('Failed to delete section');
        }
      },
      error: () => this.message.error('Server error occurred.')
    });
  }
}

