import { Component, OnInit, ComponentRef, NgZone } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppState } from '../store/app.state';
import { Navigate } from '../store/router.state';
import { SetLogged } from '../store/app.actions';
import { Route, RouterModule, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { AuthService } from '../shared/services/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ToastComponent } from '../components/toast/toast.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email = '';
  pass = '';

  state$: Observable<AppState>;

  constructor(private store: Store, private router: Router, private modalController: ModalController,
    public afAuth: AngularFireAuth, public authService: AuthService, private db: AngularFireDatabase,
    public toast: ToastComponent, public ngZone: NgZone) {
    this.state$ = this.store.select(state => state);
   }

  ngOnInit() {
  }
  forgotPassword() {
    this.authService.ForgotPassword(this.email);
  }
  SignIn() {
    const _this = this;
    if (this.email === undefined || this.pass === undefined || this.email === '' || this.pass === '') {
      _this.toast.text('Wrong email and passsword combination.');
    } else {
      _this.authService.SignIn(this.email, this.pass).then(function (data) {
        if (data.status === 'ok') {
          if (!_this.authService.isLoggedIn) {
            _this.toast.text('Verify your email address.');
          } else {
            _this.ngZone.run(() => {
              _this.router.navigate(['']);
            });
          }
        } else if (data.status === 'error') {
          _this.toast.text(data.detail.message);
        } else {
          _this.toast.text('Error desconocido');
        }
      }).catch(function (error) {
        _this.toast.text(error.message);
      });
    }
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
      component: SignUpComponent
    });
    await modal.present();
  }
  signUpGoogle() {
    const _this = this;
    this.authService.GoogleAuth().then(function (data: any) {
      if(data.status === 'ok'){
        if(data.detail.code === 'auth/popup-closed-by-user'){
          _this.toast.text(data.detail.message);
        }
        if (data.detail.hasOwnProperty('additionalUserInfo') && data.detail.additionalUserInfo.hasOwnProperty('profile')) {
          const uid = data.detail.user.uid;
          _this.db.list('/usuario').valueChanges().subscribe(d => {
            const r = d.filter(function (obj: any) {
              return obj.uid === uid;
            });
            if (r.length === 0) {
              _this.db.object('/usuario/' + uid + '/').set({
                uid: uid,
                nombre: data.detail.additionalUserInfo.profile.name,
                correo: data.detail.additionalUserInfo.profile.email,
                username: data.detail.additionalUserInfo.profile.name,
                type: 'cliente'
              }).then(function() {});
            }
          });
        }
      }else{
        _this.toast.text(data.detail.message);
      }
    });
  }
  signUpFacebook() {
    const _this = this;
    this.authService.FacebookAuth().then(function (data: any) {
      if(data.status === 'ok'){
        if(data.detail.code === 'auth/popup-closed-by-user'){
          _this.toast.text(data.detail.message);
        }
        if (data.detail.hasOwnProperty('additionalUserInfo') && data.detail.additionalUserInfo.hasOwnProperty('profile')) {
          const uid = data.detail.user.uid;
          _this.db.list('/usuario').valueChanges().subscribe(d => {
            const r = d.filter(function (obj: any) {
              return obj.uid === uid;
            });
            if (r.length === 0) {
              _this.db.object('/usuario/' + uid + '/').set({
                uid: uid,
                nombre: data.detail.additionalUserInfo.profile.name,
                correo: data.detail.additionalUserInfo.profile.email,
                username: data.detail.additionalUserInfo.profile.name,
                type: 'cliente'
              }).then(function() {});
            }
          });
        }
      } else {
        _this.toast.text(data.detail.message);
      }
    });
  }
}
