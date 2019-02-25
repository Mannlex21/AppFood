import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppState } from '../store/app.state';
import { Navigate } from '../store/router.state';
import { SetLogged } from '../store/app.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: string;
  pass: string;

  state$: Observable<AppState>;  
  constructor(private store: Store) {
    this.state$ = this.store.select(state => state);
   }

  ngOnInit() {
  }
  
  ver() {
    console.log(this.user, this.pass);
    
    const _this = this;
    
    _this.store.dispatch([
      new SetLogged(true),
    ]).subscribe(d => {
      console.log(d);
      _this.store.dispatch([
        new Navigate('/'),
      ]).subscribe(d => {
        console.log(d);
      });
    });

  }

}
