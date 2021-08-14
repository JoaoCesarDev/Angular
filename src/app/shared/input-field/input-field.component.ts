import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor,NG_VALUE_ACCESSOR } from '@angular/forms';

const INPUT_FIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef (()=>InputFieldComponent),
  multi:true
};

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css'],
  providers:[INPUT_FIELD_VALUE_ACCESSOR]
})
export class InputFieldComponent implements ControlValueAccessor {

@Input() id:string;
@Input() label:string;
@Input() type :string;
@Input() control;
@Input() fieldName:string;
@Input() isDisable = false;

private innerValue:any;

get value(){
  return this.innerValue;
}

set value(value){
  if(value !== this.innerValue){
  this.innerValue = value;
  this.onChangeCb(value);
  }
}

  onChangeCb:(_: any) => void = () => {};
  onTouchedCb:(_: any) => void = () => {};

  writeValue(obj: any): void {
   this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChangeCb = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisable = isDisabled;
  }

}
