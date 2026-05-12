import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsLayoutComponent } from './components/settings-layout/settings-layout.component';
import { GeneralSettingsComponent } from './components/general-settings/general-settings.component';
import { ThemeChangesComponent } from './components/theme-changes/theme-changes.component';
import { SocialSettingsComponent } from './components/social-settings/social-settings.component';
import { WebsiteSliderComponent } from './components/website-slider/website-slider.component';
import { IntegrationComponent } from './components/integration/integration.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsLayoutComponent,
    children: [
      { path: '',        redirectTo: 'general', pathMatch: 'full' },
      { path: 'general', component: GeneralSettingsComponent },
      { path: 'theme',   component: ThemeChangesComponent },
      { path: 'social',  component: SocialSettingsComponent },
      { path: 'slider',  component: WebsiteSliderComponent },
      { path: 'integration',  component: IntegrationComponent },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
