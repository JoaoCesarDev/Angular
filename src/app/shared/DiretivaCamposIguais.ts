import { FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export const camposIguaisValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {

  const email = control.get('email');
  const confirmarEmail = control.get('confirmarEmail');

  return email.value === confirmarEmail.value ? null : { camposNaoSaoIguais: true }

};
