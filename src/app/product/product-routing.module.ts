import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { DashboardProductComponent } from './components/dashboard-product/dashboard-product.component';
import { ProductImagesComponent } from './components/product-images/product-images.component';

const routes: Routes = [
  { path: 'add', component: AddProductComponent },
  { path: 'dashboard', component: DashboardProductComponent },
  { path: 'images/:id', component: ProductImagesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
