import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { DashboardProductComponent } from './components/dashboard-product/dashboard-product.component';

const routes: Routes = [
  { path: 'add', component: AddProductComponent },
  { path: 'dashboard', component: DashboardProductComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
