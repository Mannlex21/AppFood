import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'list-proveedor',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  proveedor = [
    {nombre: 'Cubanas', src:'https://goo.gl/VbKRyZ'}, 
    {nombre: 'McDonald\'s '},
    {nombre: 'Burguer King'}, 
    {nombre: 'Sushi Infinito'},
    {nombre: 'Diña Cristy', src:'https://goo.gl/VbKRyZ'}, 
    {nombre: 'Lirul Cisa'},
    {nombre: 'Tacos de Smog'}, 
    {nombre: 'DonJoJo'}
  ];
  hero = 'Windstorm';
  constructor() { }

  ngOnInit() {
    this.proveedor.forEach(element => {
      if(element.src==undefined){
        element.src = 'https://goo.gl/jhsD4G';
      }
    });
  }
}
