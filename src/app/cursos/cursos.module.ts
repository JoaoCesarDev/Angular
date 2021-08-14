import { CursosRoutingModule } from './cursos.routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CursoNaoEncontradoComponent } from './curso-nao-encontrado/curso-nao-encontrado.component';
import { CursoComponent } from './curso/curso.component';
import { CursosComponent } from './cursos.component';
import { CursosService } from './cursos.service';



@NgModule({
    imports:[
        CommonModule,
        CursosRoutingModule
    ],
    exports:[],
    declarations:[
        CursosComponent,
        CursoComponent,
        CursoNaoEncontradoComponent
    ],
    providers:[CursosService]
})
export class CursosModule{}