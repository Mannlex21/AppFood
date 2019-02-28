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
  idFood: string;
  proveedor: any;
  menu: any;
  food: any;
  total: any;
  contador = 1;
  constructor(private db: AngularFireDatabase, private modalController: ModalController,private navParams: NavParams) { 
  }
  ngOnInit() {
    const _this = this;
    this.db.list('/proveedor').valueChanges().subscribe(d => {
      const r = d.filter(function (val) {
        return val['id'] === _this.idProveedor;
      });

      _this.proveedor = r[0];
      _this.menu = r[0]['menu'].filter(function (val) {
        return val['id'] === _this.idFood;
      });;
      _this.food = _this.menu[0];
      _this.total = _this.food.precio; 
      console.log(_this.food);
    });
  }
  ionViewWillEnter() {
    this.idProveedor = this.navParams.get('idProveedor');
    this.idFood = this.navParams.get('idFood');
  }
  async myDismiss() {
    const result: Date = new Date();
    await this.modalController.dismiss(result);
  }
  add() {
    this.contador ++;
    this.total = this.food.precio * this.contador; 
  }
  remove() {
    if (this.contador > 1) {
      this.contador --;
      this.total = this.food.precio * this.contador; 
    }
  }
  formaterPrice(val) {
    const price = val + ' MXN';
    return price;
  }
}
