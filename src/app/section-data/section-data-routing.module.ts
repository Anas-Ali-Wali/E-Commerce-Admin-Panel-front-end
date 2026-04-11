import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardSectionDataComponent } from './components/dashboard-section-data/dashboard-section-data.component';
import { AddSectionDataComponent } from './components/add-section-data/add-section-data.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardSectionDataComponent },
  { path: 'add', component: AddSectionDataComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectionDataRoutingModule { }
