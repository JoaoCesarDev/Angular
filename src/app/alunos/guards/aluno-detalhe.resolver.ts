import { AlunosService } from './../alunos.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { aluno } from '../aluno';

@Injectable()
export class AlunoDetalheResolver implements Resolve<aluno> {
  constructor(private alunosService:AlunosService){}
  resolve(route: ActivatedRouteSnapshot): Observable<any> | any {
    let id = route.params['id'];
    return this.alunosService.getAluno(id);
  }
}
