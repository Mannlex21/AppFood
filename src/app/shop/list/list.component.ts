import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { Select, Store } from '@ngxs/store';
import { AngularFireDatabase } from 'angularfire2/database';
import { SetShowComponentShop, SetIdProveedor } from 'src/app/store/app.actions';

@Component({
  selector: 'list-shop',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Select(state => state.app) app$;
  state$: Observable<AppState>;
  proveedor = [];

  constructor(private store: Store, private db: AngularFireDatabase) {
    this.state$ = this.store.select(state => state);
  }

  ngOnInit() {
    // AQUI SE HACE LA CONSULTA A LA BD FIREBASE PARA OBTENER DATOS
    // let key = this.db.list('myFirebasePath').push({key:val}).key;
    this.db.list('/proveedor').valueChanges().subscribe(d => {
      this.proveedor = []; // Resetea el array para poder recibir info
      console.log(d);
      d.forEach(element => {
        element['src'] = 'https://goo.gl/jhsD4G';
        this.proveedor.push(element);
      });

    });
  }
  viewMenu(id) {
    this.store.dispatch([
      new SetShowComponentShop('menu'),
      new SetIdProveedor(id)
    ]);
  }
}
