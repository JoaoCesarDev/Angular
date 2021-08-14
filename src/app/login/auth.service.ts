import { users } from './users';
import { Injectable,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario_autenticado = false;

  mostraMenuEmitter = new EventEmitter<boolean>();

  constructor(private router:Router) { }

  fazerLogin(usuario:users){

    if(usuario.nome === 'jonerocker@email.com' && usuario.senha === '123456'){
      this.usuario_autenticado = true;

      this.mostraMenuEmitter.emit(true);

      this.router.navigate(['/']);
    }else{
      this.usuario_autenticado = false;
      this.mostraMenuEmitter.emit(false);
    }
  }

  usuarioAutenticado(){
    return this.usuario_autenticado;
  }

}
