import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { DashboardCategoryComponent } from './components/dashboard-category/dashboard-category.component';

const routes: Routes = [
  { path: 'add', component: AddCategoryComponent },
  { path: 'dashboard', component: DashboardCategoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
