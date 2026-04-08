import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CategoryRoutingModule } from './category-routing.module';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { DashboardCategoryComponent } from './components/dashboard-category/dashboard-category.component';


@NgModule({
  declarations: [
    AddCategoryComponent,
    DashboardCategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CategoryModule { }
