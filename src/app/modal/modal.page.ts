import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';


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

  constructor(private nav: NavParams, private ModalController: ModalController, private FormsModule:FormsModule) {}

  ngOnInit() {
  }

  CloseModal(){
    this.ModalController.dismiss();
  }

  Registrar(){

    console.log(this.form);
    
  }

  upper(event, val){
    this.form[val] = this.form[val].toUpperCase()
    // this.form.nombre = this.form.nombre.toUpperCase();
  }

  lower(event, val){
    this.form[val] = this.form[val].toLowerCase()
    // this.form.nombre = this.form.nombre.toUpperCase();
  }
}
