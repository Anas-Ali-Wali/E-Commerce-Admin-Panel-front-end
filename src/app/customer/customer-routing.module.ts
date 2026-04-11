import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';


  const routes: Routes = [
  { path: 'dashboard', component: CustomerDashboardComponent },
  { path: 'add', component: AddCustomerComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
