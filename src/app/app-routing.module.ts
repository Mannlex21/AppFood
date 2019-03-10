import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';
import { SecureInnerPagesGuard } from './shared/guard/secure-inner-pages.guard';
import { VerifyEmailComponent } from './login/components/verify-email/verify-email.component';

const routes: Routes = [
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard] },
  { path: 'shop', loadChildren: './shop/shop.module#ShopPageModule', canActivate: [AuthGuard]  },
  { path: 'history', loadChildren: './history/history.module#HistoryPageModule', canActivate: [AuthGuard] },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule', canActivate: [AuthGuard] },
  { path: 'chat', loadChildren: './chat/chat.module#ChatPageModule', canActivate: [AuthGuard] },
  { path: 'verify-email-address', component: VerifyEmailComponent, canActivate: [SecureInnerPagesGuard] }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
