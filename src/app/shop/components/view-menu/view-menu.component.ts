import { Component, OnInit, Inject, OnChanges } from '@angular/core';
import {  _MatSortHeaderMixinBase} from '@angular/material';
import { ModalController, NavParams } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { Store, Select } from '@ngxs/store';
import { AngularFireDatabase } from 'angularfire2/database';
import { SetCarrito } from 'src/app/store/app.actions';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'view-menu',
  templateUrl: './view-menu.component.html',
  styleUrls: ['./view-menu.component.scss'],
})
export class ViewMenuComponent implements OnInit {
  state$: Observable<AppState>;
  idProveedor: string;
  idFood: string;
  proveedor: any;
  menu: any;
  ingrediente: any;
  food: any;
  total: any;
  totalExtras: any;
  contador = 1;
  selectIngredient= [];
  description= '';

  @Select(state => state.app.carrito) carrito;

  constructor(private store: Store,private db: AngularFireDatabase, private modalController: ModalController, private navParams: NavParams) {
  }
  ngOnInit() {
    const _this = this;
    this.db.list('/proveedor').valueChanges().subscribe(d => {
      const r = d.filter(function (val) {
        return val['id'] === _this.idProveedor;
      });

      _this.proveedor = r[0];
      _this.ingrediente = r[0]['ingrediente'];
      _this.menu = r[0]['menu'].filter(function (val) {
        return val['id'] === _this.idFood;
      });
      _this.food = _this.menu[0];
      _this.total = _this.food.precio;
      _this.totalExtras = _this.food.precio;
      _this.calculateExtras();
    });
  }
  ionViewWillEnter() {
    this.idProveedor = this.navParams.get('idProveedor');
    this.idFood = this.navParams.get('idFood');
  }
  async myDismiss() {
    const result: Date = new Date();
    await this.modalController.dismiss(result);
  }
  add() {
    this.contador ++;
    this.total = this.food.precio * this.contador;
    this.calculateExtras();
  }
  remove() {
    if (this.contador > 1) {
      this.contador --;
      this.total = this.food.precio * this.contador;
      this.calculateExtras();
    }
  }
  formatPrice(val) {
    const price = val + ' MXN';
    return price;
  }
  formatPriceIngredient(val){
    const price ='+ ' + val + ' MXN';
    return price;
  }
  onChang() {
    this.calculateExtras();
  }
  calculateExtras() {
    let t = 0;
    this.selectIngredient.forEach(element => {
      t = t + Number(element['precio']);
    });
    t = t * this.contador;
    this.totalExtras = Number(this.total) + Number(t);
  }
  addToCart(){
    const _this = this;
    let arr = [];
    _this.carrito.subscribe(d=>{  arr = d });
    let arrI = [];
    let totalI = 0;
    _this.selectIngredient.forEach(element => {
      arrI.push({
        nombre: element['nombre'],
        precio: element['precio']
      });
      totalI = totalI+Number(element['precio']);
    });
    arr.push(
      {
        comida: _this.food.nombre,
        precio: _this.food.precio,
        cantidad: _this.contador,
        ingredientesExtras: arrI,
        descripcion: _this.description,
        total: _this.totalExtras,
        totalOnlyFood: Number(_this.food.precio)*_this.contador,
        totalIngredient: (totalI!==0) ? totalI * _this.contador : 0
      }
    );
    _this.store.dispatch([
      new SetCarrito(arr)
    ]);
  }
}
