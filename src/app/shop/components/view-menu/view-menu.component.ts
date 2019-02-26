import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ModalController, NavParams } from '@ionic/angular';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'view-menu',
  templateUrl: './view-menu.component.html',
  styleUrls: ['./view-menu.component.scss'],
})
export class ViewMenuComponent implements OnInit {
  myParameter: boolean;
  myOtherParameter: Date;

  constructor(private modalController: ModalController,
    private navParams: NavParams) { }

  ngOnInit() {}
  ionViewWillEnter() {
    this.myParameter = this.navParams.get('aParameter');
    this.myOtherParameter = this.navParams.get('otherParameter');
  }
  async myDismiss() {
    const result: Date = new Date();
    await this.modalController.dismiss(result);
  }
}
