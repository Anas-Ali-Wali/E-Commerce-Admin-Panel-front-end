import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionDataRoutingModule } from './section-data-routing.module';
import { AddSectionDataComponent } from './components/add-section-data/add-section-data.component';
import { DashboardSectionDataComponent } from './components/dashboard-section-data/dashboard-section-data.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AddSectionDataComponent,
    DashboardSectionDataComponent
  ],
  imports: [
    CommonModule,
    SectionDataRoutingModule,
    SharedModule
  ]
})
export class SectionDataModule { }
