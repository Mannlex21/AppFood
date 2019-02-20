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
    nombre:'',
    telefono:'',
    ciudad:'',
    estado:'',
    cp:'',
    pagina:'',
    descripcion:''
  };

  constructor(private store: Store, private db: AngularFireDatabase) {
    this.state$ = this.store.select(state => state);
  }

  ngOnInit() {
    var _this = this;
    _this.state$.subscribe(data => {
      _this.idProveedor = data['app'].idProveedor;
      _this.confirmDialogCancel = data['app'].confirmDialogCancel;
      _this.accion = data['app'].accion;
      if(_this.accion=='new'){
        
      }else if(_this.accion=='edit'){
        _this.setDataForm();
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
  clickSaveEdit(){
    if(this.accion=='new'){
      this.save()
    }else if(this.accion=='edit'){
      this.update(this.idProveedor);
    }
    
  }
  update(id){
    var form = this.form;
    var _this = this;
    this.db.object('/proveedor/'+id).update({ 
      nombre:form.nombre,
      descripcion:form.descripcion,
      telefono:form.telefono,
      ciudad:form.ciudad,
      estado:form.estado,
      cp:form.cp,
      pagina:form.pagina,
    }).then(function(){
      _this.store.dispatch([
        new SetShowForm(false)
      ]);
    });
  }
  save(){
    var id = this.db.database.ref('/proveedor').push().key;
    var _this = this;
    this.db.object('/proveedor/'+id+'/').set({
      id:id,
      nombre:_this.form.nombre,
      descripcion:_this.form.descripcion,
      telefono:_this.form.telefono,
      ciudad:_this.form.ciudad,
      estado:_this.form.estado,
      cp:_this.form.cp,
      pagina:_this.form.pagina,
      src:'link'
    }).then(function(){
      _this.store.dispatch([
        new SetShowForm(false)
      ]);
    });
  }
  setDataForm(){
    var form = this.form; 
    var _this = this;
    this.db.list('/proveedor').valueChanges().subscribe(d => {
      
      var r = d.filter(function (val) {
        return val['id'] === _this.idProveedor;
      })
      _this.form.nombre = r[0]['nombre'];
      _this.form.descripcion = r[0]['descripcion'];
      _this.form.telefono = r[0]['telefono'];
      _this.form.ciudad = r[0]['ciudad'];
      _this.form.estado = r[0]['estado'];
      _this.form.cp = r[0]['cp'];
      _this.form.pagina = r[0]['pagina'];
      console.log(r)
    });
  }
}
