import { AuthService } from './login/auth.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'forms';
  mostrarMenu:boolean = false;
  constructor(private AuthService:AuthService){ }

  ngOnInit(){

    this.AuthService.mostraMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    );

  }

}
