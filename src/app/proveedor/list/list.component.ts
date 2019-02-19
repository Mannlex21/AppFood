import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { SetUsername, SetShowForm } from 'src/app/store/app.actions';
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
  proveedor= []; /*[
    {nombre: 'Cubanas', src: 'https://goo.gl/VbKRyZ'},
    {nombre: 'McDonald\'s '},
    {nombre: 'Burguer King'},
    {nombre: 'Sushi Infinito'},
    {nombre: 'Diña Cristy', src: 'https://goo.gl/VbKRyZ'},
    {nombre: 'Lirul Cisa'},
    {nombre: 'Tacos de Smog'},
    {nombre: 'DonJoJo'}
  ];*/
  items: Array<any>;

  constructor(private store: Store, private db: AngularFireDatabase,private sanitizer: DomSanitizer) {
    this.state$ = this.store.select(state => state);
  }

  ngOnInit() {
    // this.proveedor.forEach(element => {
    //   if (element.src === undefined) {
    //     element.src = 'https://goo.gl/jhsD4G';
    //   }
    // });
    // AQUI SE HACE LA CONSULTA A LA BD FIREBASE PARA OBTENER DATOS
    this.db.list('/proveedor').valueChanges().subscribe(d => {
      console.log(d);
      // this.proveedor = d;
      d.forEach(element => {
        console.log(element['src'])
        if (element['src'] != undefined) {
          element['src'] = 'https://goo.gl/jhsD4G';
        }
        this.proveedor.push(element);
      });

    });
  }

  clickHandler(username) {
    this.store.dispatch([
      new SetUsername(username),
      new SetShowForm(true),
    ]);
  }
  getImg(val){
    console.log(this.sanitizer.bypassSecurityTrustStyle('url(' + val + ')'))
    return this.sanitizer.bypassSecurityTrustStyle('url(' + val + ')');
  }
}
