import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { SetIdProveedor, SetShowForm, SetAccion } from 'src/app/store/app.actions';
import { Navigate } from 'src/app/store/router.state';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { AngularFireDatabase } from 'angularfire2/database';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'list-proveedor',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Select(state => state.app) app$;
  state$: Observable<AppState>;
  proveedor = []; /*[
    {nombre: 'Cubanas', src: 'https://goo.gl/VbKRyZ'},
    {nombre: 'McDonald\'s '},
    {nombre: 'Burguer King'},
    {nombre: 'Sushi Infinito'},
    {nombre: 'Diña Cristy', src: 'https://goo.gl/VbKRyZ'},
    {nombre: 'Lirul Cisa'},
    {nombre: 'Tacos de Smog'},
    {nombre: 'DonJoJo'}
  ];*/
  constructor(private store: Store, private db: AngularFireDatabase, private sanitizer: DomSanitizer) {
    this.state$ = this.store.select(state => state);
  }

  ngOnInit() {
    // this.proveedor.forEach(element => {
    //   if (element.src === undefined) {
    //     element.src = 'https://goo.gl/jhsD4G';
    //   }
    // });
    // AQUI SE HACE LA CONSULTA A LA BD FIREBASE PARA OBTENER DATOS
    // let key = this.db.list('myFirebasePath').push({key:val}).key;
    this.db.list('/proveedor').valueChanges().subscribe(d => {
      this.proveedor = []; // Resetea el array para poder recibir info
      console.log(d);
      d.forEach(element => {
        // if (element['src'] != undefined) {
        // }
        element['src'] = 'https://goo.gl/jhsD4G';
        this.proveedor.push(element);
      });
    });
  }

  edit(id) {
    this.store.dispatch([
      new SetIdProveedor(id),
      new SetAccion('edit'),
      new SetShowForm(true),
    ]);
  }
  nuevo() {
    this.store.dispatch([
      new SetAccion('new'),
      new SetShowForm(true)
    ]);
  }
  getImg(val) {
    console.log(this.sanitizer.bypassSecurityTrustStyle('url(' + val + ')'))
    return this.sanitizer.bypassSecurityTrustStyle('url(' + val + ')');
  }
  delete(id) {
    console.log(id);
    this.db.database.ref('/proveedor').child('/' + id).remove();
  }
}
