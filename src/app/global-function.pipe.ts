import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formaterPrice'
})
export class FormaterPrice implements PipeTransform {
  transform(value: string): string {
    return value + ' MXN';
  }
}
@Pipe({
  name: 'formaterPriceAdd'
})
export class FormaterPriceAdd implements PipeTransform {
  transform(value: string): string {
    return '+ ' + value + ' MXN';
  }
}
@Pipe({
  name: 'formaterAddress'
})
export class FormaterAddress implements PipeTransform {
  transform(direccion: string, cp: string, ciudad: string, estado: string): string {
    // if (direccion === undefined || cp === undefined || ciudad === undefined || estado === undefined){
    //   return '';
    // }
    return direccion + '. ' + cp + '. ' + ciudad + ', ' + estado + '.';
  }
}

@Pipe({
  name: 'formaterPhone'
})
export class FormaterPhone implements PipeTransform {
  transform(phone: string): string {
    return (phone !== undefined && phone !== null) ? phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3') : phone;
  }
}