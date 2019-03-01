import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { AngularFireDatabase } from 'angularfire2/database';
import { SetShowComponentShop, SetShowViewMenu } from 'src/app/store/app.actions';
import { ViewMenuComponent } from '../components/view-menu/view-menu.component';
import { ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'menu-shop',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  state$: Observable<AppState>;
  idProveedor: string;
  proveedor: any;
  menu: any;
  clasifMenu: any;

  animal: string;
  name: string;
  carrito= [];

  constructor(private store: Store, private db: AngularFireDatabase, public modalController: ModalController) {
    const _this = this;
    this.state$ = this.store.select(state => state);
  }

  ngOnInit() {
    const _this = this;
    _this.state$.subscribe(data => {
      _this.idProveedor = data['app'].idProveedor;
      _this.carrito = data['app'].carrito;
      console.log(_this.carrito)
      this.db.list('/proveedor').valueChanges().subscribe(d => {
        d.forEach(element => {
          element['src'] = 'https://goo.gl/jhsD4G'; // https://goo.gl/jhsD4G';
        });
        const r = d.filter(function (val) {
          return val['id'] === _this.idProveedor;
        });
        _this.proveedor = r[0];
        _this.menu = r[0]['menu'];
        this.formatMenu();
        console.log(_this.clasifMenu);
      });
    });
  }
  formatMenu() {
    const _this = this;
    const array = [];
    _this.menu.forEach(element => {
      if (containObject(array, element.clasificacion)) {
        array.forEach(element2 => {
          if (element2.clasificacion === element.clasificacion) {
            element2.menu.push(element);
          }
        });
      } else {
        array.push( { clasificacion: element.clasificacion, menu: [element]});
      }
    });
    _this.clasifMenu = array;
    function containObject(arr, val) {
      let c = 0;
      arr.forEach(element => {
        if (element.clasificacion === val) {
          c++;
        }
      });
      if ( c > 0 ) {
        return true;
      } else {
        return false;
      }
    }
  }
  formaterPrice(val) {
    const price = val + ' MXN';
    return price;
  }
  atras() {
    this.store.dispatch([
      new SetShowComponentShop('shop'),
    ]);
  }
  openFood() {
    this.store.dispatch([
      new SetShowViewMenu(true),
    ]);
  }
  async openModal(id) {
    const _this = this;
    const modal: HTMLIonModalElement =
       await this.modalController.create({
          component: ViewMenuComponent,
          componentProps: {
            idProveedor: _this.idProveedor,
            idFood: id
          }
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
       if (detail !== null) {
       }
    });
    await modal.present();
  }
}
