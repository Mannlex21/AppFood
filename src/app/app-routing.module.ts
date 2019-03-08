import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  // { path: 'proveedor', loadChildren: './proveedor/proveedor.module#ProveedorPageModule' },
  // { path: 'shop', loadChildren: './shop/shop.module#ShopPageModule' },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'proveedor', loadChildren: './proveedor/proveedor.module#ProveedorPageModule' },
  { path: 'shop', loadChildren: './shop/shop.module#ShopPageModule' },
  { path: 'history', loadChildren: './history/history.module#HistoryPageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'chat', loadChildren: './chat/chat.module#ChatPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
