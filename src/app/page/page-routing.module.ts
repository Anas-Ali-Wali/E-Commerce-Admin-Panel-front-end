import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPageComponent } from './components/add-page/add-page.component';
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';

const routes: Routes = [
  { path: 'add', component: AddPageComponent },
  { path: 'dashboard', component: DashboardPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
