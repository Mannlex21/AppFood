import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ModalController, NavParams } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngxs/store';
import { AngularFireDatabase } from 'angularfire2/database';

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
  state$: Observable<AppState>;
  idProveedor: string;
  proveedor: any;
  menu: any;
  constructor(private store: Store, private db: AngularFireDatabase, private modalController: ModalController,private navParams: NavParams) { 
  }
  ngOnInit() {
    const _this = this;
    this.db.list('/proveedor').valueChanges().subscribe(d => {
      const r = d.filter(function (val) {
        return val['id'] === _this.idProveedor;
      }); 
      _this.proveedor = r[0];
      _this.menu = r[0]['menu'];
    });
  }
  ionViewWillEnter() {
    this.idProveedor = this.navParams.get('idProveedor');
  }
  async myDismiss() {
    const result: Date = new Date();
    await this.modalController.dismiss(result);
  }
}
