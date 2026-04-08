import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { DashboardOrderComponent } from './components/dashboard-order/dashboard-order.component';

const routes: Routes = [
  { path: 'add', component: AddOrderComponent },
  { path: 'dashboard', component: DashboardOrderComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
