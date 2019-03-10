import { Component, OnInit, Inject, OnChanges } from '@angular/core';
import {  _MatSortHeaderMixinBase} from '@angular/material';
import { ModalController, NavParams } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { Store, Select } from '@ngxs/store';
import { AngularFireDatabase } from 'angularfire2/database';
import { SetCarrito } from 'src/app/store/app.actions';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';

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
    public authService: AuthService) {
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
        if (data.hasOwnProperty('additionalUserInfo')) {
          if (data.additionalUserInfo.hasOwnProperty('profile')) {
            if (data.additionalUserInfo.profile.hasOwnProperty('email')) {
              const uid = data.user.uid;
              _this.db.list('/usuario').valueChanges().subscribe(d => {
                const r = d.filter(function (obj: any) {
                  return obj.uid === uid;
                });
                if (r.length === 0) {
                  _this.db.object('/usuario/' + uid + '/').set({
                    uid: uid,
                    nombre: data.additionalUserInfo.profile.name,
                    correo: data.additionalUserInfo.profile.email,
                    username: form.controls.username.value,
                    type: 'cliente'
                  }).then(function() {});
                }
              });
            }
          }
        }
        _this.myDismiss();
      });
    }
  }
}
