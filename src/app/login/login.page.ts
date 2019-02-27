import { Component, OnInit, ComponentRef } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppState } from '../store/app.state';
import { Navigate } from '../store/router.state';
import { SetLogged } from '../store/app.actions';
import { Route, RouterModule, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: string;
  pass: string;

  state$: Observable<AppState>;

  constructor(private store: Store, private router: Router, private ModalController: ModalController) {
    this.state$ = this.store.select(state => state);
   }

  ngOnInit() {
  }
  
  SignIn() {
    console.log(this.user, this.pass);
    
    const _this = this;
    
    _this.store.dispatch([
      new SetLogged(true),
    ]).subscribe(d => {
      console.log(d);
      _this.router.navigate(['/']);
      // _this.store.dispatch([
      //   new Navigate('/'),
      // ]).subscribe(d => {
      //   console.log(d);
      // });
    });

  }

  async OpenModal(){
    
    const modal = await this.ModalController.create({
      component: ModalPage
    });

    modal.present();
  }  
}
