import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngxs/store';

@Component({
  selector: 'cart-shop',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  store$: Observable<AppState>;
  total: 0;
  amount: 0;
  cart: any;
  constructor(private store: Store) {
    this.store$ = this.store.select(state => state);
  }

  ngOnInit() {
    const _this = this;
    _this.store$.subscribe(data => {
      _this.cart = data['app']['carrito'];
      _this.total = 0;
      _this.amount = 0;
      _this.cart.forEach(element => {
        _this.total = _this.total + element.total;
        _this.amount = _this.amount + element.cantidad;
      });
      console.log(_this.cart);
    });
  }

}
