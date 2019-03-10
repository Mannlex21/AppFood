import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AngularFireDatabase } from 'angularfire2/database';
import { SetIdProveedor, SetShowComponentShop, SetAccion, SetShowForm, SetLogged } from 'src/app/store/app.actions';

@Component({
  selector: 'list-shop',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  proveedor = [];
  user: any;
  access = false;

  constructor(private store: Store, private db: AngularFireDatabase) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    const _this = this;
    // AQUI SE HACE LA CONSULTA A LA BD FIREBASE PARA OBTENER DATOS
    _this.db.list('/proveedor').valueChanges().subscribe(d => {
      _this.proveedor = []; // Resetea el array para poder recibir info
      d.forEach(element => {
        element['src'] = 'https://goo.gl/jhsD4G';
        _this.proveedor.push(element);
      });
    });
    _this.db.list('/usuario').valueChanges().subscribe(d => {
      d.forEach((element: any) => {
        if (element.uid === _this.user.uid) {
        _this.access = (element.type === 'admin') ? true : false;
        }
      });
    });
  }
  viewMenu(id) {
    this.store.dispatch([
      new SetShowComponentShop('menu'),
      new SetIdProveedor(id)
    ]);
  }
  edit(id) {
    this.store.dispatch([
      new SetIdProveedor(id),
      new SetAccion('edit'),
      new SetShowComponentShop('form'),
    ]);
  }
  newP() {
    this.store.dispatch([
      new SetAccion('new'),
      new SetShowComponentShop('form'),
    ]);
  }
  delete(id) {
    this.db.database.ref('/proveedor').child('/' + id).remove();
  }
  logout() {
    const _this = this;
    _this.store.dispatch([
      new SetLogged(false),
    ]).subscribe(d => {
    });
  }
}
