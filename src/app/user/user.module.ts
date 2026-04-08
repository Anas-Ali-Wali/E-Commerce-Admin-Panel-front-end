import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { AddUserComponent } from './components/add-user/add-user.component';
import { DashboardUserComponent } from './components/dashboard-user/dashboard-user.component';


@NgModule({
  declarations: [
    AddUserComponent,
    DashboardUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UserModule { }
