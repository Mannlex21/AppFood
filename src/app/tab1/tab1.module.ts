import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { AppState } from '../store/app.state';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }]),
    NgxsModule.forFeature([AppState])
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
