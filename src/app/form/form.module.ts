import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConsultaCepService } from './consulta-cep.service';
import { ErrorMsgComponent } from '../shared/error-msg/error-msg.component';
import { InputFieldComponent } from '../shared/input-field/input-field.component';
import { BaseFormComponent } from '../shared/base-form/base-form.component';

@NgModule({
  declarations: [
    FormComponent,
    ErrorMsgComponent,
    InputFieldComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ],
  providers: [ConsultaCepService],
})
export class FormModule { }
