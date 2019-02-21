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
  state$: Observable<AppState>;
  showComponentShop: string;
  constructor(private store: Store) {
    this.state$ = this.store.select(state => state);
  }

  ngOnInit() {
    this.state$.subscribe(data => {
      console.log(data);
      this.showComponentShop = data['app'].showComponentShop;
    });
  }
  atras() {
    this.store.dispatch([
      new SetShowComponentShop('shop'),
    ]);
  }

}
