import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { OrderRoutingModule } from './order-routing.module';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { DashboardOrderComponent } from './components/dashboard-order/dashboard-order.component';


@NgModule({
  declarations: [
    AddOrderComponent,
    DashboardOrderComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class OrderModule { }
