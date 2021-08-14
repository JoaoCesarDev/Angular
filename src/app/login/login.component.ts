import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { users } from './users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:users = new users();

  constructor(private AuthService:AuthService) { }

  ngOnInit(): void {
    this.usuario.senha = '123456';
  }

  fazerLogin(){
    this.AuthService.fazerLogin(this.usuario);
  }

}
