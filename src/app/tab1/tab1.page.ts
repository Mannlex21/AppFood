import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from '../store/app.state';
import { Store, Select } from '@ngxs/store';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  state$: Observable<AppState>;
  @Select(AppState) app$: Observable<string[]>;
  nombre: String;

  constructor(private store: Store) {
    this.state$ = this.store.select(state => state);
    this.i();
  }
  i() {
    this.state$.subscribe(data => {
      console.log(data);
      this.nombre = data['app'].username;
    });
  }
}
