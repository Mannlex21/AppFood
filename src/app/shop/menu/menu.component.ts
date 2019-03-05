import { Component, OnInit, HostListener, Renderer2, NgZone } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable, fromEvent } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { AngularFireDatabase } from 'angularfire2/database';
import { SetShowComponentShop, SetCarrito } from 'src/app/store/app.actions';
import { ViewMenuComponent } from '../components/view-menu/view-menu.component';

import { ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';


@Component({
  selector: 'menu-shop',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  state$: Observable<AppState>; // Variable que lee los estados del store
  idProveedor: string; // Variable que almacena el id del proveedor seleccionado
  proveedor: any; // Variable que almacena la informacion total del proveedor seleccionado
  menu: any; // Variable que almacena la informacion del menu del proveedor seleccionadop
  clasifMenu: any; // Variable que almacena la informacion del menu organizada por clasificacion
  cart = []; // Variable que almacena la informacion del carrito de compras
  showCarrito = true; // Variable que almacena el estado de la vista del carrito
  total = 0;
  constructor(private store: Store, private db: AngularFireDatabase, public modalController: ModalController, private renderer: Renderer2,
    private zone: NgZone) {
    this.state$ = this.store.select(state => state);
  }
  ngOnInit() {
    const _this = this;
    _this.state$.subscribe(data => {
      _this.idProveedor = data['app'].idProveedor;
      _this.cart = data['app'].carrito;
      _this.total = 0;
      _this.cart.forEach(element => {
        _this.total = _this.total + element.total;
      });
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
      });
    });
    // Esta funcion esta asigna un valor false a la variable showCarrito
    // al llegar a cierta medida de la pantalla
    matchMedia('(max-width: 768px)').addListener((mql => {
      if (mql.matches) {
          this.zone.run(() => {
            _this.showCarrito = false;
          });
      } else {
        _this.showCarrito = true;
      }
    }));
  }
  // Formatea el menu en clasificaciones
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
  // Funcion que permite ir hacia la lista de proveedores
  atras() {
    this.store.dispatch([
      new SetShowComponentShop('shop'),
    ]);
  }
  // Funcion que permite abrir modal de view menu
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
  // Elimina un pedido del carrito de compras
  removeFoodCart(val) {
    const _this = this;
    _this.cart = _this.cart.filter(function(value, index, arr) {
      return index !== val;
    });
    _this.store.dispatch([
      new SetCarrito(_this.cart)
    ]).subscribe(d => {});
  }
  saveCart() {
    const _this = this;
    let total = 0;
    let amount = 0;
    _this.cart.forEach(element => {
      total = total + element.total;
      amount = amount + element.cantidad;
    });
    const id = this.db.database.ref('/cart').push().key;
    // Cuando el login finalize, el path quedaria asi /cart/idUsuario/idCart
    this.db.object('/cart/' + id + '/').set({
      id: id,
      total: total,
      amount: amount,
      detail: _this.cart
    }).then(function() {
      _this.store.dispatch([
        new SetCarrito([])
      ]);
    });
  }
}
