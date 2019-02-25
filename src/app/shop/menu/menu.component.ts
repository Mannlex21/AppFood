import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetShowComponentShop } from 'src/app/store/app.actions';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { AngularFireDatabase } from 'angularfire2/database';

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

  constructor(private store: Store, private db: AngularFireDatabase) {
    const _this = this;
    this.state$ = this.store.select(state => state);
  }

  ngOnInit() {
    const _this = this;
    _this.state$.subscribe(data => {
      _this.idProveedor = data['app'].idProveedor;
      this.db.list('/proveedor').valueChanges().subscribe(d => {
        const r = d.filter(function (val) {
          return val['id'] === _this.idProveedor;
        });
        d.forEach(element => {
          element['src'] = 'https://goo.gl/jhsD4G';
        });
        _this.proveedor = r[0];
        _this.menu = r[0]['menu'];
      });
    });
  }
  atras() {
    this.store.dispatch([
      new SetShowComponentShop('shop'),
    ]);
  }
}
