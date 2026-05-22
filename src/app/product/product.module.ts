import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ProductRoutingModule } from './product-routing.module';
import { AddProductComponent } from './components/add-product/add-product.component';
import { DashboardProductComponent } from './components/dashboard-product/dashboard-product.component';
import { SharedModule } from '../shared/shared.module';
import { ProductImagesComponent } from './components/product-images/product-images.component';

@NgModule({
  declarations: [
    AddProductComponent,
    DashboardProductComponent,
    ProductImagesComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class ProductModule { }
