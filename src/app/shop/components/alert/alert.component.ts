import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { AppState } from 'src/app/store/app.state';
import { Observable } from 'rxjs';
import { SetShowComponentShop, SetDataAlert } from 'src/app/store/app.actions';

@Component({
  selector: 'alert-component',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  state$: Observable<AppState>;
  dataAlert= {};
  constructor(public alertController: AlertController, private store: Store) {
    this.state$ = this.store.select(state => state);
  }

  ngOnInit() {
    const _this = this;
    _this.presentAlertConfirm();
    _this.state$.subscribe(data => {
      _this.dataAlert = data['app'].dataAlert;
    });
  }
  async presentAlertConfirm() {
    const _this = this;
    const alert = await this.alertController.create({
      header: 'Cancelar',
      message: 'Todos los datos se perderan. ¿Deseas salir?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            this.store.dispatch([
              new SetDataAlert({show:false,from:'form',to:'shop'}),
            ]);
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Okay');
            this.store.dispatch([
              new SetDataAlert({show:false,from:'form',to:'shop'}),
              new SetShowComponentShop(_this.dataAlert['to']),
            ]);
          }
        }
      ]
    });

    await alert.present();
  }

}
