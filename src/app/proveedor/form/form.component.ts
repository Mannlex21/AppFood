import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { Store, Select } from '@ngxs/store';
import { SetShowForm, SetConfirmDialogCancel } from 'src/app/store/app.actions';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'form-proveedor',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Select(state => state.app.idProveedor) StoreidProveedor;
  @Select(state => state.app.accion) accion;
  @Select(state => state.app.confirmDialogCancel) confirmDialogCancel;

  idProveedor: string;
  form = {
    nombre: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    estado: '',
    cp: '',
    pagina: '',
    descripcion: ''
  };
  formMenu = {
    nombre: '',
    tipo: '',
    tamano: '',
    otroTamano: '',
    precio: 0
  };
  menu = [];
  tabla = [];

  constructor(private store: Store, private db: AngularFireDatabase) {
  }

  ngOnInit() {
    const _this = this;
    _this.StoreidProveedor.subscribe(data => { _this.idProveedor = data; });
    _this.accion.subscribe(data => {
      if (data === 'edit') {
        _this.setDataForm();
        _this.db.list('/proveedor').valueChanges().subscribe(d => {
          const r = d.filter(function (val) {
            return val['id'] === _this.idProveedor;
          });
          _this.menu = r[0]['menu'];
          _this.setTabla();
        });
      }
    });
    /*_this.state$.subscribe(data => {
      _this.idProveedor = data['app'].idProveedor;
      _this.confirmDialogCancel = data['app'].confirmDialogCancel;
      _this.accion = data['app'].accion;
      if (_this.accion === 'edit') {
        _this.setDataForm();
        _this.db.list('/proveedor').valueChanges().subscribe(d => {
          const r = d.filter(function (val) {
            return val['id'] === _this.idProveedor;
          });
          _this.menu = r[0]['menu'];
          _this.setTabla();
        });
      }
    });*/
  }
  cancel() {
    this.store.dispatch([
      new SetConfirmDialogCancel(true),
    ]).subscribe(d => {
      console.log(d);
    });
  }
  clickSaveEdit() {
    const _this = this;
    _this.accion.subscribe(data => {
      if (data === 'new') {
        this.save();
      } else if (data === 'edit') {
        this.update(this.idProveedor);
      }
    });
  }
  update(id) {
    const _this = this;
    this.db.object('/proveedor/' + id).update( {
      nombre: _this.form.nombre,
      direccion: _this.form.direccion,
      descripcion: _this.form.descripcion,
      telefono: _this.form.telefono,
      ciudad: _this.form.ciudad,
      estado: _this.form.estado,
      cp: _this.form.cp,
      pagina: _this.form.pagina,
      menu: _this.menu
    }).then(function() {
      _this.store.dispatch([
        new SetShowForm(false)
      ]);
    });
  }
  save() {
    const id = this.db.database.ref('/proveedor').push().key;
    const _this = this;
    this.db.object('/proveedor/' + id + '/').set({
      id: id,
      nombre: _this.form.nombre,
      direccion: _this.form.direccion,
      descripcion: _this.form.descripcion,
      telefono: _this.form.telefono,
      ciudad: _this.form.ciudad,
      estado: _this.form.estado,
      cp: _this.form.cp,
      pagina: _this.form.pagina,
      src: 'link',
      menu: _this.menu
    }).then(function() {
      _this.store.dispatch([
        new SetShowForm(false)
      ]);
    });
  }
  setDataForm() {
    const _this = this;
    this.db.list('/proveedor').valueChanges().subscribe(d => {
      const r = d.filter(function (val) {
        return val['id'] === _this.idProveedor;
      });
      _this.form.nombre = r[0]['nombre'];
      _this.form.direccion = r[0]['direccion'];
      _this.form.descripcion = r[0]['descripcion'];
      _this.form.telefono = r[0]['telefono'];
      _this.form.ciudad = r[0]['ciudad'];
      _this.form.estado = r[0]['estado'];
      _this.form.cp = r[0]['cp'];
      _this.form.pagina = r[0]['pagina'];
      console.log(r);
    });
  }
  // Agrega a la tabla del menu
  addToTable() {
    const _this = this;
    // const existFood = _this.menu.filter(function (data) {
    //   return data.nombre === _this.formMenu.nombre && data.tipo === _this.formMenu.tipo;
    // });
    // if (existFood.length > 0) {
    //   const medida = {
    //     medida: _this.formMenu.tamano,
    //     precio: _this.formMenu.precio
    //   };
    //   existFood[0].medidas.push(medida);
    //   _this.setTabla();
    // } else {
      const obj = {
        nombre: _this.formMenu.nombre,
        tipo: _this.formMenu.tipo,
        precio: _this.formMenu.precio
        // medidas: [
        //   {
        //     medida: _this.formMenu.tamano,
        //     precio: _this.formMenu.precio
        //   }
        // ]
      };
      _this.menu.push(obj);
      console.log(_this.menu);
      _this.setTabla();
    // }
  }
  // Convierte el objeto menu en tabla para que el html pueda procesarlo
  setTabla() {
    const data = this.menu;
    const _this = this;
    _this.tabla = [];
    data.forEach(function (element, index) {
      const o = {
        idFood: index,
        tipo: 'food',
        nombre: element.nombre,
        medida: element.medida,
        precio: element.precio
      };
      _this.tabla.push(o);
      // element.medidas.forEach(function (element2, index2) {
      //   const o2 = {
      //     idFood: index,
      //     idSize: index2,
      //     tipo: 'size',
      //     nombre: '',
      //     medida: element2.medida,
      //     precio: element2.precio
      //   };
      //   _this.tabla.push(o2);
      // });
    });
  }
  // Borra la comida seleccionada dentro del menu
  removeFood(idFood) {
    this.menu = this.menu.filter(function(item, index) {
      return index !== idFood;
    });
    this.menu = this.menu.filter(function() { return true; });
    this.setTabla();
    // this.db.database.ref('/proveedor/' + this.idProveedor + '/menu').child('/' + idFood ).remove();
  }
  // Borra la medida de la comida seleccionada dentro del menu
  removeSize(idFood, idSize) {
    this.menu[idFood].medidas = this.menu[idFood].medidas.filter(function(item , index) {
      return index !== idSize;
    });
    this.menu[idFood].medidas = this.menu[idFood].medidas.filter(function() { return true; });
    this.setTabla();
    // this.db.database.ref('/proveedor/' + this.idProveedor + '/menu/' + idFood + '/medidas').child('/' + idSize).remove();
  }
}
