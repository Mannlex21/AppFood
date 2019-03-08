import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppState } from '../store/app.state';
import { Navigate } from '../store/router.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  state$: Observable<AppState>;
  constructor(private store: Store, private router: Router){
    this.state$ = this.store.select(state => state.app);      
    const _this = this;

    this.state$.subscribe(data => {
      console.log(data);  
      if(!data['logged']){
        _this.router.navigate(['/login']);
        // _this.store.dispatch([
        //   new Navigate('/login'),
        // ]).subscribe(d => {
        //   console.log(d);
        // });

      }   
    });  
  }
  ngOnInit() {
    
  }
}
