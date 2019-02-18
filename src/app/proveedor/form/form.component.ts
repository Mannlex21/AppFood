import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngxs/store';
import { SetShowForm } from 'src/app/store/app.actions';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'form-proveedor',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  state$: Observable<AppState>;
  nombre: string;
  memory: any;
  constructor(private store: Store, private db: AngularFireDatabase) {
    this.state$ = this.store.select(state => state);
  }

  ngOnInit() {
    this.state$.subscribe(data => {
      console.log(data);
      this.nombre = data['app'].username;
    });
  }
  atras() {
    this.store.dispatch([
      new SetShowForm(false),
    ]);
  }
  onSubmit() {
    this.memory.date = new Date(this.memory.date).valueOf();
    this.db.list('proveedor').push(this.memory)
      .then(_ => {
        this.memory = {};
        console.log('success');
      });
  }

}
