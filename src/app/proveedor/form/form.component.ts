import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngxs/store';
import { SetShowForm, SetConfirmDialogCancel } from 'src/app/store/app.actions';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'form-proveedor',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  state$: Observable<AppState>;
  idProveedor: string;
  accion: string;
  confirmDialogCancel: boolean;
  form = {
    nombre: '',
    telefono: '',
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
    this.state$ = this.store.select(state => state);
  }

  ngOnInit() {
    const _this = this;
    _this.state$.subscribe(data => {
      _this.idProveedor = data['app'].idProveedor;
      _this.confirmDialogCancel = data['app'].confirmDialogCancel;
      _this.accion = data['app'].accion;
      if (_this.accion === 'edit') {
        _this.setDataForm();
        this.db.list('/proveedor').valueChanges().subscribe(d => {
          const r = d.filter(function (val) {
            return val['id'] === _this.idProveedor;
          });
          this.menu = r[0]['menu'];
          _this.setTabla();
        });
      }
    });
  }
  cancel() {
    this.store.dispatch([
      new SetConfirmDialogCancel(true),
    ]).subscribe(d => {
      console.log(d);
    });
    // this.store.dispatch([
    //   new SetShowForm(false),
    // ]);
  }
  clickSaveEdit() {
    if (this.accion === 'new') {
      this.save();
    } else if (this.accion === 'edit') {
      this.update(this.idProveedor);
    }
  }
  update(id) {
    const _this = this;
    this.db.object('/proveedor/' + id).update( {
      nombre: _this.form.nombre,
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
    const existFood = _this.menu.filter(function (data) {
      return data.nombre === _this.formMenu.nombre && data.tipo === _this.formMenu.tipo;
    });
    if (existFood.length > 0) {
      const medida = {
        medida: _this.formMenu.tamano,
        precio: _this.formMenu.precio
      };
      existFood[0].medidas.push(medida);
      _this.setTabla();
    } else {
      const obj = {
        nombre: _this.formMenu.nombre,
        tipo: _this.formMenu.tipo,
        medidas: [
          {
            medida: _this.formMenu.tamano,
            precio: _this.formMenu.precio
          }
        ]
      };
      _this.menu.push(obj);
      _this.setTabla();
    }
  }
  // Convierte el objeto menu en tabla para que el html pueda procesarlo
  setTabla() {
    const data = this.menu;
    const _this = this;
    _this.tabla = [];
    data.forEach(function (element) {
      const o = {
        nombre: element.nombre,
        medida: element.medida,
        precio: element.precio,
        id: null
      };
      _this.tabla.push(o);
      element.medidas.forEach(function (element2, index) {
        const o2 = {
          nombre: '',
          medida: element2.medida,
          precio: element2.precio,
          id: index,
        };
        _this.tabla.push(o2);
      });
    });
  }
}
