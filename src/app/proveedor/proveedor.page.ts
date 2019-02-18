import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from '../store/app.state';
import { Store, Select } from '@ngxs/store';
import { SetUsername } from '../store/app.actions';
import { Navigate } from '../store/router.state';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.page.html',
  styleUrls: ['./proveedor.page.scss'],
})
export class ProveedorPage implements OnInit {
  state$: Observable<AppState>;
  showForm: boolean;
  constructor(private store: Store) {
    this.state$ = this.store.select(state => state);
  }
  ngOnInit() {
    this.state$.subscribe(data => {
      console.log(data);
      this.showForm = data['app'].showForm;
    });
  }
}
