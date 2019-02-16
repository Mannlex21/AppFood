import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegistroProveedorPage } from './registro-proveedor.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroProveedorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegistroProveedorPage]
})
export class RegistroProveedorPageModule {}
