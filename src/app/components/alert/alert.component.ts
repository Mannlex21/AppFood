import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { AppState } from 'src/app/store/app.state';
import { Observable } from 'rxjs';
import { SetConfirmDialogCancel, SetShowForm } from 'src/app/store/app.actions';

@Component({
  selector: 'alert-component',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  state$: Observable<AppState>;
  constructor(public alertController: AlertController,private store: Store) {
   }

  ngOnInit() {
    this.presentAlertConfirm();
  }
  async presentAlertConfirm() {
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
              new SetConfirmDialogCancel(false),
            ])
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Okay');
            this.store.dispatch([
              new SetConfirmDialogCancel(false),
              new SetShowForm(false),
            ])
          }
        }
      ]
    });

    await alert.present();
  }

}
