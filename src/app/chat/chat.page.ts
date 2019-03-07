import { Component, OnInit, OnChanges, Input, NgZone } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import * as $  from 'jquery'
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  msgVal: string = '';
  items = [];
  usuario = '';
  constructor(private db: AngularFireDatabase,private zone: NgZone ) { 
    // this.items = db.list('/messages', ref => ref.limitToLast(5)).valueChanges();
    
  }
  ngOnInit() {
    const _this = this;
    _this.db.list('/messages').valueChanges().subscribe(d => {
      _this.items = []; 
      d.forEach(element => {
        _this.items.push(element);
      });
    });
    // scroll automatico 
    // var div = document.getElementById('div');
    // div.scrollTop = div.scrollHeight;
  }
  chatSend(theirMessage: string) {
    this.db.list('/messages').push({ message: theirMessage, usuario: this.usuario}).then(function () {
      var div = document.getElementById('div');
      div.scrollTop = div.scrollHeight;
    });
    this.msgVal = '';
  }
}
