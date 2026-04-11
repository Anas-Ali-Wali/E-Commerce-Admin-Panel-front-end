import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';


@NgModule({
  declarations: [
  
    AddCustomerComponent,
       CustomerDashboardComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule
  ]
})
export class CustomerModule { }
