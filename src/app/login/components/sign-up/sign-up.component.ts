import { Component, OnInit, Inject, OnChanges } from '@angular/core';
import {  _MatSortHeaderMixinBase} from '@angular/material';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { Store, Select } from '@ngxs/store';
import { AngularFireDatabase } from 'angularfire2/database';
import { SetCarrito } from 'src/app/store/app.actions';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { ToastComponent } from 'src/app/components/toast/toast.component';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  form = {
    nombre: '',
    correo: '',
    // telefono: null,
    username: '',
    pass: '',
  };
  constructor(private nav: NavParams, private modalController: ModalController, private formsModule: FormsModule,
    private db: AngularFireDatabase, private store: Store, public afAuth: AngularFireAuth,
    public authService: AuthService, public toast: ToastComponent) {
  }
  ionViewWillEnter() {
  }
  ngOnInit() {
  }
  async myDismiss() {
    await this.modalController.dismiss();
  }
  signUp(form) {
    const _this = this;
    if (form.value) {
      this.authService.SignUp(form.controls.correo.value, form.controls.pass.value).then(function (data) {
        if (data.status === 'ok') {
          if (data.hasOwnProperty('additionalUserInfo') && data.detail.additionalUserInfo.hasOwnProperty('profile')
              && data.detail.additionalUserInfo.profile.hasOwnProperty('email')) {
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
                  username: form.controls.username.value,
                  type: 'cliente'
                }).then(function() {
                  _this.toast.text('Se registro correctamente');
                  _this.myDismiss();
                });
              }
            });
          }
        } else if (data.status === 'error') {
          _this.toast.text(data.detail.message);
        } else {
          _this.toast.text('Error desconocido');
        }
      });
    }
  }
  // async toast(msg) {
  //   const toast = await this.toastController.create({
  //     message: msg,
  //     showCloseButton: true,
  //     position: 'bottom',
  //     duration: 4000,
  //     closeButtonText: 'Ok'
  //   });
  //   toast.present();
  // }
}
