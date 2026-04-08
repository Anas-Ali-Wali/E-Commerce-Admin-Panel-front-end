import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LayoutRoutingModule } from './layout-routing.module';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';





@NgModule({
  declarations: [
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    RouterModule,
     NzLayoutModule,
    NzMenuModule,
    NzIconModule

  ]
})
export class LayoutModule { }
