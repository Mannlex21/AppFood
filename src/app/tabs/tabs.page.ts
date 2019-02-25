import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppState } from '../store/app.state';
import { Navigate } from '../store/router.state';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  state$: Observable<AppState>;
  constructor(private store: Store){
    this.state$ = this.store.select(state => state);
          
  }
  ngOnInit() {
    const _this = this;

      this.state$.subscribe(data => {
      console.log(data);  
      if(!data['app'].logged){

        _this.store.dispatch([
          new Navigate('/login'),
        ]).subscribe(d => {
          console.log(d);
        });

      }   
    }); 
  }
}
