import { FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-base-form',
  template: '<br>'
})
export abstract class BaseFormComponent implements OnInit {

  form:FormGroup;




  constructor() { }

  abstract submit();

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.form.valid){
      this.submit();
    }else{
      console.log('Formulário Inválido!');
      this.verificaValidacoesForm(this.form);
    }
  }

  verificaValidacoesForm(formGroup:FormGroup | FormArray){
    Object.keys(formGroup.controls).forEach(campo =>{
      const controle = formGroup.get(campo);
      controle.markAsDirty();
      controle.markAsTouched();
      if(controle instanceof FormGroup || controle instanceof FormArray){
        this.verificaValidacoesForm(controle);
      }
    });
  }

  reset(){
    this.form.reset();
  }

}
