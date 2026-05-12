import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SettingsLayoutComponent } from './components/settings-layout/settings-layout.component';
import { GeneralSettingsComponent } from './components/general-settings/general-settings.component';
import { ThemeChangesComponent } from './components/theme-changes/theme-changes.component';
import { SocialSettingsComponent } from './components/social-settings/social-settings.component';
import { WebsiteSliderComponent } from './components/website-slider/website-slider.component';
import { IntegrationComponent } from './components/integration/integration.component';


@NgModule({
  declarations: [
    SettingsLayoutComponent,
    GeneralSettingsComponent,
    ThemeChangesComponent,
    SocialSettingsComponent,
    WebsiteSliderComponent,
    IntegrationComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule
  ]
})
export class SettingsModule { }
