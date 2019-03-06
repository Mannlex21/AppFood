import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { Store, Select } from '@ngxs/store';
import { SetShowComponentShop, SetDataAlert } from 'src/app/store/app.actions';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'form-proveedor',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Select(state => state.app.idProveedor) StoreidProveedor;
  @Select(state => state.app.accion) accion;
  @Select(state => state.app.dataAlert.show) showAlert;

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
    clasificacion: '',
    precio: 0,
    descripcion: ''
  };
  formIngrediente = {
    nombre: '',
    precio: 0,
  };
  menu = [];
  ingrediente = [];
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
          _this.menu = (r[0]['menu'] !== undefined) ?  r[0]['menu'] : [];
          _this.ingrediente = (r[0]['ingrediente'] !== undefined) ? r[0]['ingrediente'] : [];
          // _this.setTabla();
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
      new SetDataAlert({show:true,from:'form',to:'shop'}),
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
    const idF = this.db.database.ref('/proveedor').push().key;
    const arrMenu = []; const arrIngrediente = [];
    // Aqui cambia los id predefinidos por unos especificados
    _this.menu.forEach(element => {
      if (!element.hasOwnProperty('id')) {
        const idFood = this.db.database.ref('/proveedor/' + idF + '/menu').push().key;
        element.id = idFood;
      }
      arrMenu.push(element);
    });
    _this.ingrediente.forEach(element => {
      if (!element.hasOwnProperty('id')) {
        const idIngrediente = this.db.database.ref('/proveedor/' + idF + '/ingrediente').push().key;
        element.id = idIngrediente;
      }
      arrIngrediente.push(element);
    });
    this.db.object('/proveedor/' + id).update( {
      nombre: _this.form.nombre,
      direccion: _this.form.direccion,
      descripcion: _this.form.descripcion,
      telefono: _this.form.telefono,
      ciudad: _this.form.ciudad,
      estado: _this.form.estado,
      cp: _this.form.cp,
      pagina: _this.form.pagina,
      menu: _this.menu,
      ingrediente: arrIngrediente
    }).then(function() {
      _this.store.dispatch([
        new SetShowComponentShop('shop'),
      ]);
    });
  }
  save() {
    const _this = this;
    const id = this.db.database.ref('/proveedor').push().key;
    const arrMenu = []; const arrIngrediente = [];
    // Aqui cambia los id predefinidos por unos especificados
    _this.menu.forEach(element => {
      const idFood = this.db.database.ref('/proveedor/' + id + '/menu').push().key;
      element.id = idFood;
      arrMenu.push(element);
    });
    _this.ingrediente.forEach(element => {
      const idIngrediente = this.db.database.ref('/proveedor/' + id + '/ingrediente').push().key;
      element.id = idIngrediente;
      arrIngrediente.push(element);
    });
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
      menu: arrMenu,
      ingrediente: arrIngrediente
    }).then(function() {
      _this.store.dispatch([
        new SetShowComponentShop('shop'),
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
    const obj = {
      nombre: _this.formMenu.nombre,
      clasificacion: _this.formMenu.clasificacion,
      precio: _this.formMenu.precio,
      descripcion: _this.formMenu.descripcion
    };
    _this.menu.push(obj);
  }
  addToTableIngrediente() {
    const _this = this;
    const obj = {
      nombre: _this.formIngrediente.nombre,
      precio: _this.formIngrediente.precio,
    };
    _this.ingrediente.push(obj);
  }
  // Convierte el objeto menu en tabla para que el html pueda procesarlo
  setTabla() {
    const data = this.menu;
    const _this = this;
    _this.tabla = [];
    data.forEach(function (element, index) {
      const o = {
        idFood: index,
        clasificacion: element.clasificacion,
        nombre: element.nombre,
        precio: element.precio
      };
      _this.tabla.push(o);
    });
  }
  // Borra la comida seleccionada dentro del menu
  removeFood(id) {
    this.menu = this.menu.filter(function(item) {
      return item.id !== id;
    });
    // this.db.database.ref('/proveedor/' + this.idProveedor + '/menu').child('/' + idFood ).remove();
  }
  // Borra la medida de la comida seleccionada dentro del menu
  removeSize(idFood, idSize) {
    this.menu[idFood].medidas = this.menu[idFood].medidas.filter(function(item , index) {
      return index !== idSize;
    });
    // this.db.database.ref('/proveedor/' + this.idProveedor + '/menu/' + idFood + '/medidas').child('/' + idSize).remove();
  }
}
