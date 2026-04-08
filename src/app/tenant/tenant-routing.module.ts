import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTenantComponent } from './components/add-tenant/add-tenant.component';
import { DashboardTenantComponent } from './components/dashboard-tenant/dashboard-tenant.component';

const routes: Routes = [
  { path: 'add', component: AddTenantComponent },
  { path: 'dashboard', component: DashboardTenantComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantRoutingModule { }
