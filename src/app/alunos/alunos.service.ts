import { Injectable } from '@angular/core';
import { aluno } from './aluno';

@Injectable()
export class AlunosService {

  private alunos:aluno[]=[
    {id: 1,nome: 'Jone The Roney',email: 'jonetheroney@joker.com'},
    {id: 2,nome: 'Djow Crazy',email: 'djowcrazy@madman.com'},
    {id: 3,nome: 'Trend Ripsey',email: 'trendripsey@rocketman.com'},
  ];

  constructor() { }

  getAlunos(){
    return this.alunos;
  }

  getAluno(id:number){
    let alunos = this.getAlunos();
    for(let i = 0;i < alunos.length;i++){
      let aluno = alunos[i];
      if(aluno.id == id){
        return aluno;
      }
    }
    return null;
  }

}
