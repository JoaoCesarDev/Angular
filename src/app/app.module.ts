//import { AlunosModule } from './alunos/alunos.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenubarComponent } from './menubar/menubar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { FormsModule} from '@angular/forms';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { FormModule } from './form/form.module';
import { HttpClientModule } from '@angular/common/http';

//import { CursosModule } from './cursos/cursos.module';




@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    HomePageComponent,
    LoginComponent,
    PaginaNaoEncontradaComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    FormModule,
    HttpClientModule,
    //AlunosModule,
    //CursosModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
