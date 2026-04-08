import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { PageRoutingModule } from './page-routing.module';
import { AddPageComponent } from './components/add-page/add-page.component';
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';


@NgModule({
  declarations: [
    AddPageComponent,
    DashboardPageComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PageModule { }
