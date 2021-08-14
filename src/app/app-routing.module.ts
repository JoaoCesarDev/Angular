
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes,} from '@angular/router';


import { FormComponent } from './form/form.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { CursosGuard } from './guards/cursos.guard';
import { AlunosGuard } from './guards/alunos.guard';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';

const routes: Routes = [

  {path:'cursos',
  loadChildren: () => import("./cursos/cursos.module").then(m => m.CursosModule),
  canActivate:[AuthGuard],
  canActivateChild:[CursosGuard],
  canLoad:[AuthGuard]
  },

  {path:'alunos', loadChildren: () => import("./alunos/alunos.module").then(m => m.AlunosModule),
  canActivate:[AuthGuard],
  canActivateChild:[AlunosGuard],
  canLoad:[AuthGuard]
  },

  {path: 'form',component: FormComponent,
  canActivate:[AuthGuard]
  },

  {path: 'login',component: LoginComponent},

  {path: '',component: FormComponent,
  canActivate:[AuthGuard]
  },
  {
    path: '', redirectTo:'/form',pathMatch:'full'
  },
  {
    path:'**',component:PaginaNaoEncontradaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
