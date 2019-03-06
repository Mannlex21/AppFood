import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { SetCarrito } from 'src/app/store/app.actions';
import { ShopPage } from '../../shop.page';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss'],
})
export class CartModalComponent implements OnInit {
  state$: Observable<AppState>; // Variable que lee los estados del store
  cart = [];
  total: 0;
  constructor(private store: Store, private modalController: ModalController,
    private navParams: NavParams, private db: AngularFireDatabase) {
    this.state$ = this.store.select(state => state);
  }

  ngOnInit() {
    const _this = this;
    _this.state$.subscribe(data => {
      _this.cart = data['app'].carrito;
      _this.total = 0;
      _this.cart.forEach(element => {
        _this.total = _this.total + element.total;
      });
    });
  }
  ionViewWillEnter() {
  }
  async myDismiss() {
    const result: Date = new Date();
    await this.modalController.dismiss(result);
  }
  // Elimina un pedido del carrito de compras
  removeFoodCart(val) {
    const _this = this;
    _this.cart = _this.cart.filter(function(value, index, arr) {
      return index !== val;
    });
    _this.store.dispatch([
      new SetCarrito(_this.cart)
    ]).subscribe(d => {
      if ( _this.cart.length === 0) {
        _this.myDismiss();
      }
    });
  }
  saveCart() {
    const _this = this;
    const date = new Date();
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
      fecha: date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear(),
      total: total,
      amount: amount,
      detail: _this.cart
    }).then(function() {
      _this.store.dispatch([
        new SetCarrito([])
      ]);
      _this.myDismiss();
    });
  }
}
