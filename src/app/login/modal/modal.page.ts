import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { FormsModule, NgForm, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { Store } from '@ngxs/store';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  form = {
    nombre: '',
    correo: '',
    // telefono: null,
    // usuario:'',
    pass:''
  };
  private _fullName: string;

  get fullName(): string {
    return this.form.nombre;
}

set fullName(newName: string) {
    this.form.nombre = this.form.nombre.toUpperCase();
}form2: any = { };

  constructor( private nav: NavParams, private modalController: ModalController, private formsModule: FormsModule,
    private db: AngularFireDatabase, private store: Store, public afAuth: AngularFireAuth, 
    public authService: AuthService) {

  }
  SaveChanges(form) {
    console.log(form.value);
  }
  ngOnInit() {
  }
  async myDismiss() {
    await this.modalController.dismiss();
  }
  CloseModal() {
    this.modalController.dismiss();
  }
  upper(event, val) {
    this.form[val] = this.form[val].toUpperCase();
  }
  lower(event, val) {
    this.form[val] = this.form[val].toLowerCase();
  }
  signUp(form) {
    const _this = this;
    if (form.value) {
      const id = this.db.database.ref('/usuario').push().key;
      const _this = this;
      _this.db.object('/usuario/' + id + '/').set({
        id: id,
        nombre: form.controls.nombre.value,
        correo: form.controls.correo.value,
        // telefono: form.controls.telefono.value,
        // usuario: form.controls.usuario.value,
        pass: form.controls.pass.value
      }).then(function() {});
      this.authService.SignUp(form.controls.correo.value, form.controls.pass.value).then(function () {
        _this.CloseModal();
      })
    }
  }
}
