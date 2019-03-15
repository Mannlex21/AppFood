import { Component, OnInit, OnChanges, Input, NgZone } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import * as $ from 'jquery';
import { AuthService } from '../shared/services/auth.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  msgVal = '';
  items = [];
  usuario: any;
  username = 'invitado';
  typing = false;
  userTyping = [];
  typingMessage = '';
  constructor(private db: AngularFireDatabase, private zone: NgZone, public authService: AuthService) {
    // this.items = db.list('/messages', ref => ref.limitToLast(5)).valueChanges();
    this.usuario = JSON.parse(localStorage.getItem('user'));
  }
  ngOnInit() {
    const _this = this;
    const uid = _this.usuario.uid;
    _this.db.list('/usuario').valueChanges().subscribe(d => {
      _this.typing = false;
      _this.userTyping = [];
      d.forEach((element: any) => {
        if (element.uid === uid) {
          _this.username = (element.username !== undefined && element.username !== '') ? element.username : _this.username;
        }
        if (element.uid !== uid && element.typing === true) {
          _this.typing = true;
          _this.userTyping.push(element.username);
        }
      });
      if(_this.userTyping.length == 1){
        _this.typingMessage = _this.userTyping[0] + ' esta escribiendo...'
      }else{
        _this.typingMessage = 'Estan escribiendo...'
      }
      // _this.username = (r[0]['username'] !== undefined) ? r[0]['username'] : _this.username;
    });
    _this.db.list('/messages').valueChanges().subscribe(d => {
      _this.items = [];
      const dateToday = _this.formaterDate(new Date());
      d.forEach((element: any) => {
        const date = _this.formaterDate(new Date(element.date));
        const time = _this.formaterTime(new Date(element.date));
        element.date = (dateToday === date) ? 'Hoy, ' + time : date + ', ' + time;
        _this.items.push(element);
      });
    });
    $('#contact-form').on( 'change keydown keyup paste cut', 'textarea', function () {
      _this.resizeTextArea(this);
    }).find('textarea#message').change();
    const div = document.getElementById('div');
    div.scrollTop = div.scrollHeight;
    $( "#message" ).focus(function() {
      _this.typingFunction(true);
    });
    $( "#message" ).focusout(function() {
      _this.typingFunction(false);
    })
  }
  isMobile() {
    if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)) {
        return true;
      }
      return false;
  }
  chatSend() {
    const _this = this;
    if (this.msgVal !== '') {
      this.db.list('/messages').push({ message: this.msgVal, username: this.username, date: new Date().toISOString()}).then(function () {
        _this.msgVal = '';
        $(document.querySelector('#contact-form textarea')).height(30);
        $('#buttonSend').height($(document.querySelector('#contact-form textarea')).height());
        const div = document.getElementById('div');
        div.scrollTop = div.scrollHeight;
        _this.resizeTextArea($(document.querySelector('#contact-form textarea')));
      });
    }
  }
  chatSendEnter(event) {
    if (!this.isMobile()) {
      this.chatSend();
    }
  }
  preventEnter(event) {
    // if (!this.isMobile()) {
    //   this.chatSend();
    //   event.preventDefault();
    // }
  }
  typingFunction(val) {
    const _this = this;
    if (val) {
      const uid = _this.usuario.uid;
      _this.db.object('/usuario/' + uid + '/').update({
        typing: true
      }).then(function() {});
    } else {
      const uid = _this.usuario.uid;
      _this.db.object('/usuario/' + uid + '/').update({
        typing: false
      }).then(function() {});
    }
  }
  formaterDate (date: Date) {
    let dd: any = date.getDate();
    let mm: any = date.getMonth() + 1;
    const yyyy = date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    return  mm + '/' + dd + '/' + yyyy;
  }
  formaterTime(date: Date) {
    let hours = date.getHours();
    let minutes: any = date.getMinutes();
    const ampm: any = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
  }
  resizeTextArea(_this) {
    $(_this).height(0).height(_this.scrollHeight);
    if ($(_this).height() >= 64) {
      $('textarea#message').css('overflow', 'auto');
    } else {
      $('textarea#message').css('overflow', 'hidden');
    }
    $('#buttonSend').height($(_this).height());
    if ($(_this).height() === 0) {
      $('#messagesBox').css('padding-bottom', 39 + 'px');
    } else {
      $('#messagesBox').css('padding-bottom', ($(_this).height() + 19) + 'px');
    }
  }
}
