import { Component, OnInit, ComponentRef } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppState } from '../store/app.state';
import { Navigate } from '../store/router.state';
import { SetLogged } from '../store/app.actions';
import { Route, RouterModule, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalPage } from './modal/modal.page';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { AuthService } from "../shared/services/auth.service";
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  pass: string;

  state$: Observable<AppState>;

  constructor(private store: Store, private router: Router, private modalController: ModalController, 
    public afAuth: AngularFireAuth, public authService: AuthService, private db: AngularFireDatabase) {
    this.state$ = this.store.select(state => state);
   }

  ngOnInit() {
  }
  forgotPassword(){
    this.authService.ForgotPassword(this.email);
  }
  SignIn() {
    
    const _this = this;
    _this.authService.SignIn(this.email, this.pass);
    // _this.afAuth.auth.signInWithEmailAndPassword(this.email, this.pass).then(function (data) {
    //   console.log(data)
    //   console.log(_this.afAuth.auth.currentUser)
    //   _this.router.navigate(['/']);
    //   _this.store.dispatch([
    //     new Navigate('/'),
    //   ]).subscribe(d => {
    //     console.log(d);
    //   });
    // }).catch(function(error) {
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    // });
  }

  async OpenModal() {
    const modal = await this.modalController.create({
      component: ModalPage
    });
    modal.present();
  }

  validate() {
    console.log('validar');
  }
  signUpGoogle(){
    const _this = this;
    this.authService.GoogleAuth().then(function (data) {
      _this.db.list('/usuario').valueChanges().subscribe(d => { 
        d.forEach(element => {
          
        });
        var r = d.filter(function (obj: any) {
          return obj.correo === data.additionalUserInfo.profile.email;
        })
        if(r.length === 0){
          const id = _this.db.database.ref('/usuario').push().key;
          _this.db.object('/usuario/' + id + '/').set({
            id: id,
            nombre: data.additionalUserInfo.profile.name,
            correo: data.additionalUserInfo.profile.email
          }).then(function() {});
        }
      });
    });
  }
}
