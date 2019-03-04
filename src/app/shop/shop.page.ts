import { Component, OnInit, HostListener } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppState } from '../store/app.state';
import { SetShowComponentShop } from '../store/app.actions';
import { CartModalComponent } from './components/cart-modal/cart-modal.component';
import { ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
  menu$: Observable<AppState>;
  select: any;
  showComponentShop: string;
  showViewMenu: boolean;
  showCartModal: boolean;
  cart: any;

  constructor(private store: Store, public modalController: ModalController) {
    this.menu$ = this.store.select(state => state);
  }
  ngOnInit() {
    const _this = this;
    _this.menu$.subscribe(data => {
      _this.showComponentShop = data['app']['showComponentShop'];
      _this.showViewMenu = data['app']['showViewMenu'];
      _this.cart = data['app']['carrito'];
    });
  }
  atras() {
    this.store.dispatch([
      new SetShowComponentShop('shop'),
    ]);
  }
  async openCartModal() {
    const _this = this;
    const modal: HTMLIonModalElement =
       await this.modalController.create({
          component: CartModalComponent,
          componentProps: {
          }
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
       if (detail !== null) {
       }
    });
    await modal.present();
  }

}
