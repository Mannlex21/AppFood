import { Component, OnInit, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class ToastComponent implements OnInit {

  constructor(public toastController: ToastController) { }

  ngOnInit() {}
  async text(msg) {
    const toast = await this.toastController.create({
      message: msg,
      showCloseButton: true,
      position: 'bottom',
      duration: 4000,
      closeButtonText: 'Ok'
    });
    toast.present();
  }
}
