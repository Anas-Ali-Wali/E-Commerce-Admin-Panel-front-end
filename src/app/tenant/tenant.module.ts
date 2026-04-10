import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantRoutingModule } from './tenant-routing.module';
import { AddTenantComponent } from './components/add-tenant/add-tenant.component';
import { DashboardTenantComponent } from './components/dashboard-tenant/dashboard-tenant.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    AddTenantComponent,
    DashboardTenantComponent
  ],
  imports: [
    CommonModule,
    TenantRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class TenantModule { }
