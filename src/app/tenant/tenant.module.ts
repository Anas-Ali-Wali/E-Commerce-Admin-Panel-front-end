import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TenantRoutingModule } from './tenant-routing.module';
import { AddTenantComponent } from './components/add-tenant/add-tenant.component';
import { DashboardTenantComponent } from './components/dashboard-tenant/dashboard-tenant.component';


@NgModule({
  declarations: [
    AddTenantComponent,
    DashboardTenantComponent
  ],
  imports: [
    CommonModule,
    TenantRoutingModule,
    ReactiveFormsModule
  ]
})
export class TenantModule { }
