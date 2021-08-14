import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CursoComponent } from './curso/curso.component';
import { CursosComponent } from './cursos.component';
import { CursoNaoEncontradoComponent } from './curso-nao-encontrado/curso-nao-encontrado.component';

const cursosRoutes: Routes = [
  {path: '',component: CursosComponent},
  {path: 'naoEncontrado',component: CursoNaoEncontradoComponent},
  {path: ':id',component: CursoComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(cursosRoutes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
