import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppState } from '../store/app.state';
import { Navigate } from '../store/router.state';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  state$: Observable<AppState>;
  constructor(private store: Store, private router: Router, public afAuth: AngularFireAuth){
    this.state$ = this.store.select(state => state.app);      
    

   
  }
  ngAfterViewInit() { 
    
  
  }
  ngAfterContentInit(){
    // const _this = this;
    // _this.afAuth.auth.onAuthStateChanged(user => {
    //   if (user) {
    //     console.log(user)
    //   }else{
    //     _this.router.navigate(['/login']);
    //   }
    // });
  }
  ngOnInit() {
    // const _this = this;
    // _this.afAuth.auth.onAuthStateChanged(user => {
    //   if (user) {
    //     console.log(user)
    //   }else{
    //     _this.router.navigate(['/login']);
    //   }
    // });
    // this.state$.subscribe(data => {
    //   console.log(data);  
      
    //   if(!data['logged']){
    //     _this.router.navigate(['/login']);
    //   }   
    // });  
  }
}
