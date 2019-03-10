import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from '../store/app.state';
import { Navigate } from '../store/router.state';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit, OnDestroy {
  state$: Observable<AppState>;
  user: any;
  access = false;
  usuarioFirebase: Subscription;
  constructor(private store: Store, private router: Router, public afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.state$ = this.store.select(state => state.app);
    this.user = JSON.parse(localStorage.getItem('user'));
  }
  ngOnInit() {
    const _this = this;
    _this.usuarioFirebase = _this.db.list('/usuario').valueChanges().subscribe(d => {
      d.forEach((element: any) => {
       if (element.correo.toString().toLowerCase() === JSON.parse(localStorage.getItem('user')).email.toString().toLowerCase()) {
        _this.access = (element.type === 'admin') ? true : false;
       }
      });
    });
  }
  ngOnDestroy() {
    this.usuarioFirebase.unsubscribe();
  }
}
