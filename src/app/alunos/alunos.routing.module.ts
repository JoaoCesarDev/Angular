import { AlunoDetalheResolver } from './guards/aluno-detalhe.resolver';
import { AlunosDeactivateGuard } from './../guards/alunos-deactivate.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlunoDetalheComponent } from './aluno-detalhe/aluno-detalhe.component';
import { AlunosFormComponent } from './alunos-form/alunos-form.component';
import { AlunosComponent } from './alunos.component';


const alunosRoutes: Routes = [
    {path: '',component: AlunosComponent, children:[
        {path: 'novo',component: AlunosFormComponent},
        {path: ':id',component: AlunoDetalheComponent,
         resolve:{aluno: AlunoDetalheResolver}},
        {path: ':id/editar',component: AlunosFormComponent,
         canDeactivate:[AlunosDeactivateGuard]
        }
    ]},


];

@NgModule({
  imports: [RouterModule.forChild(alunosRoutes)],
  exports: [RouterModule]
})
export class AlunosRoutingModule { }
