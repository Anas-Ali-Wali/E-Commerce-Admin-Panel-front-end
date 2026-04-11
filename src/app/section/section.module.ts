import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionRoutingModule } from './section-routing.module';
import { AddSectionComponent } from './components/add-section/add-section.component';
import { DashboardSectionComponent } from './components/dashboard-section/dashboard-section.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AddSectionComponent,
    DashboardSectionComponent
  ],
  imports: [
    CommonModule,
    SectionRoutingModule,
    SharedModule
  ]
})
export class SectionModule { }
