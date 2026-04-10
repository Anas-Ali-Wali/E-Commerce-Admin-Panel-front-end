import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { AuthGuard } from '../auth/core/guards/auth.guard';

// const routes: Routes = [
//   {
//     path: '',
//     component: MainLayoutComponent,
//     children: [
//       { path: 'tenant', loadChildren: () => import('../tenant/tenant.module').then(m => m.TenantModule) },
//       { path: 'user', loadChildren: () => import('../user/user.module').then(m => m.UserModule) },
//       { path: 'category', loadChildren: () => import('../category/category.module').then(m => m.CategoryModule) },
//       { path: 'product', loadChildren: () => import('../product/product.module').then(m => m.ProductModule) },
//       { path: 'order', loadChildren: () => import('../order/order.module').then(m => m.OrderModule) },
//       { path: 'page', loadChildren: () => import('../page/page.module').then(m => m.PageModule) },
//       { path: '', redirectTo: 'tenant/dashboard', pathMatch: 'full' },
//     ]
//   }
// ];

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
        canActivate: [AuthGuard],  // ✅ yahan lagao
    children: [
      { path: 'tenant', loadChildren: () => import('../tenant/tenant.module').then(m => m.TenantModule) },
      { path: 'user', loadChildren: () => import('../user/user.module').then(m => m.UserModule) },
      { path: 'category', loadChildren: () => import('../category/category.module').then(m => m.CategoryModule) },
      { path: 'product', loadChildren: () => import('../product/product.module').then(m => m.ProductModule) },
      { path: 'order', loadChildren: () => import('../order/order.module').then(m => m.OrderModule) },
      { path: 'page', loadChildren: () => import('../page/page.module').then(m => m.PageModule) },
      { path: '', redirectTo: 'tenant/dashboard', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
