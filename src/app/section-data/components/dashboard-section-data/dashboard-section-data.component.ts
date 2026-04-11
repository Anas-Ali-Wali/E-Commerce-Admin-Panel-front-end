import { Component } from '@angular/core';
import { SectionDataResponseDto } from '../../interface/section-data-interfaces';
import { SectionDataService } from '../../service/section-data.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard-section-data',
  templateUrl: './dashboard-section-data.component.html',
  styleUrls: ['./dashboard-section-data.component.css']
})
export class DashboardSectionDataComponent {
  sectionDataList: SectionDataResponseDto[] = [];
  originalList: SectionDataResponseDto[] = [];
  searchText = '';
  isLoading = false;
  sectionId!: number;

  constructor(
    private sectionDataService: SectionDataService,
    private message: NzMessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // sectionId query param se lo
    this.route.queryParams.subscribe(params => {
      this.sectionId = +params['sectionId'] || 0;
      if (this.sectionId) {
        this.loadSectionData();
      }
    });
  }

  loadSectionData() {
    this.isLoading = true;

    this.sectionDataService.getDataBySection(this.sectionId).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.success && res.data) {
          this.originalList = res.data;
          this.sectionDataList = [...this.originalList];
        }
      },
      error: () => {
        this.isLoading = false;
        this.message.error('Failed to load section data.');
      }
    });
  }

  // Search filter
  onSearch() {
    const value = this.searchText.toLowerCase();
    this.sectionDataList = this.originalList.filter(item =>
      Object.values(item).some(val =>
        val && val.toString().toLowerCase().includes(value)
      )
    );
  }

  // Delete
  deleteSectionData(id: number) {
    this.sectionDataService.deleteSectionData(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.message.success('Deleted successfully');
          this.loadSectionData();
        } else {
          this.message.error('Failed to delete');
        }
      },
      error: () => this.message.error('Server error occurred.')
    });
  }

}
