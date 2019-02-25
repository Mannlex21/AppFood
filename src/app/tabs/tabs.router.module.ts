import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
     {
        path: 'proveedor',
        children: [
          {
            path: '',
            loadChildren: '../proveedor/proveedor.module#ProveedorPageModule'
          }
        ]
      },
      {
        path: 'shop',
        children: [
          {
            path: '',
            loadChildren: '../shop/shop.module#ShopPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/proveedor',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'login',
    redirectTo: '/login'
  },
  {
    path: '',
    redirectTo: '/tabs/proveedor',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
