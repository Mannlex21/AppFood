import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { SetCarrito } from 'src/app/store/app.actions';

@Component({
  selector: 'cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss'],
})
export class CartModalComponent implements OnInit {
  state$: Observable<AppState>; // Variable que lee los estados del store
  cart = [];

  constructor(private store: Store, private modalController: ModalController, private navParams: NavParams) {
    this.state$ = this.store.select(state => state);
  }

  ngOnInit() {
    const _this = this;
    _this.state$.subscribe(data => {
      _this.cart = data['app'].carrito;
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
}
