import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  
  // { path: 'proveedor', loadChildren: './proveedor/proveedor.module#ProveedorPageModule' },
  // { path: 'shop', loadChildren: './shop/shop.module#ShopPageModule' },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },  { path: 'modal', loadChildren: './modal/modal.module#ModalPageModule' },

  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
