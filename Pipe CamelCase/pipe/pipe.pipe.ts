import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCase'
})
export class CamelCasePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let values = value.split('');  //separa as pelavras pelo espaço
    let result = ''  //resultado que será retornado

    for(let v of value){   //percorrendo cada palavra da frase
      result += this.capitalize(v) + ' ';
    }
    return result;
  }

  capitalize(value: string){
    return value.substring(0,1).toUpperCase + value.substring(1).toLowerCase();  //pega o primeiro caracter e apenas ele e colocando em maiusculo
  }

}
