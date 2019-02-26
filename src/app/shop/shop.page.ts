import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppState } from '../store/app.state';
import { SetShowComponentShop } from '../store/app.actions';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
  menu$: Observable<AppState>;

  showComponentShop: string;
  showViewMenu: boolean;
  constructor(private store: Store) {
    this.menu$ = this.store.select(state => state);
  }

  ngOnInit() {
    const _this = this;
    _this.menu$.subscribe(data => {
      console.log( data);
      _this.showComponentShop = data['app']['showComponentShop'];
      _this.showViewMenu = data['app']['showViewMenu'];
    });
  }
  atras() {
    this.store.dispatch([
      new SetShowComponentShop('shop'),
    ]);
  }

}
