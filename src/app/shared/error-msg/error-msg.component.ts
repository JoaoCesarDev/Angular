import { validacoes } from './../Validacoes';
import { FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.css']
})
export class ErrorMsgComponent implements OnInit {

  //@Input() msgErro:string;
 // @Input() mostrarErro:boolean;
  @Input() control:FormControl;
  @Input() fieldName: string;

  constructor() { }

  ngOnInit(): void {
  }

  get errorMessage(){

    for(const propertyName in this.control.errors){
      if(this.control.errors.hasOwnProperty(propertyName) && this.control.touched){
        return validacoes.getErrorMsg(this.fieldName,propertyName,this.control.errors[propertyName])
      }
    }

    return null;
  }

}
