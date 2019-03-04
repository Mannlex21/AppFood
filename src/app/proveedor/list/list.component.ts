import { Component, OnInit, NgZone } from '@angular/core';
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
  proveedor = [];
  // showNewP: Boolean;
  constructor(private store: Store, private db: AngularFireDatabase, private sanitizer: DomSanitizer, private zone: NgZone) {
    const _this = this;
    this.state$ = this.store.select(state => state);
    // matchMedia('(max-width: 579px)').addListener((mql => {
    //   if (mql.matches) {
    //       this.zone.run(() => {
    //         _this.showNewP = false;
    //       });
    //   } else {
    //     _this.showNewP = true;
    //   }
    // }));
    // console.log(_this.showNewP);
  }
  ngOnInit() {
    const _this = this;
    // AQUI SE HACE LA CONSULTA A LA BD FIREBASE PARA OBTENER DATOS
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
  newP() {
    this.store.dispatch([
      new SetAccion('new'),
      new SetShowForm(true)
    ]);
  }
  getImg(val) {
    return this.sanitizer.bypassSecurityTrustStyle('url(' + val + ')');
  }
  delete(id) {
    console.log(id);
    this.db.database.ref('/proveedor').child('/' + id).remove();
  }
}
