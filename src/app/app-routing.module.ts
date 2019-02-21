import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'proveedor', loadChildren: './proveedor/proveedor.module#ProveedorPageModule' },
  { path: 'tab1', loadChildren: './tab1/tab1.module#Tab1PageModule' },  { path: 'shop', loadChildren: './shop/shop.module#ShopPageModule' }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
