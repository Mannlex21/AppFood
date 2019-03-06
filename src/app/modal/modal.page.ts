import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { FormsModule, NgForm, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  form={ 
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    correo: '',
    telefono: null,
    domicilio: '',
    ciudad: '',
    estado: '',
    cp: null
  };
  private _fullName: string;

  get fullName(): string {
    return this.form.nombre;
}

set fullName(newName: string) {
    this.form.nombre = this.form.nombre.toUpperCase();
}

form2: any = { };

  constructor(
    private nav: NavParams,
    private ModalController: ModalController,
    private FormsModule:FormsModule,
    private db: AngularFireDatabase,
    private store: Store
    ) {
      // this.form2 = this.formBuilder.group({
      //   nombre: [''],
      //   apellidoPaterno: [''],
      //   apellidoMaterno: [''],
      //   correo: [''],
      //   telefono: [''],
      //   domicilio: [''],
      //   ciudad: [''],
      //   estado: [''],
      //   cp: ['']
      // });
    }

    SaveChanges(form) {
      console.log(form.value);
      }

  ngOnInit() {

    this.form2 = new FormGroup({
      'name': new FormControl(this.form2.nombre, [
        Validators.required,
        Validators.minLength(4)
      ])
    });

  }

  CloseModal(){
    this.ModalController.dismiss();
  }

  Registrar(){

    console.log(this.form);

    const id = this.db.database.ref('/usuario').push().key;
    const _this = this;

    this.db.object('/usuario/' + id + '/').set({
      id: id,
      nombre: _this.form.nombre + ' ' + _this.form.apellidoPaterno + ' ' + _this.form.apellidoMaterno,
      correo: _this.form.correo,
      telefono: _this.form.telefono,
      domicilio: _this.form.domicilio,
      ciudad: _this.form.ciudad,
      estado: _this.form.estado,
      cp: _this.form.cp
      }).then(function() {});
    
  }

  upper(event, val){
    this.form[val] = this.form[val].toUpperCase()
    // this.form.nombre = this.form.nombre.toUpperCase();
  }

  lower(event, val){
    console.log(val);
    
    this.form2.value.correo = this.form2.value.correo.toLowerCase();    
    console.log(this.form2.value.correo);   
    // this.form.nombre = this.form.nombre.toUpperCase();
  }

  JS(form){

    console.log(form);    
  }
}
