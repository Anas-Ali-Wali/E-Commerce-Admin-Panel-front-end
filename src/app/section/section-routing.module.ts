import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardSectionComponent } from './components/dashboard-section/dashboard-section.component';
import { AddSectionComponent } from './components/add-section/add-section.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardSectionComponent },
  { path: 'add', component: AddSectionComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectionRoutingModule { }
