import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './components/add-user/add-user.component';
import { DashboardUserComponent } from './components/dashboard-user/dashboard-user.component';

const routes: Routes = [
  { path: 'add', component: AddUserComponent },
  { path: 'dashboard', component: DashboardUserComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
