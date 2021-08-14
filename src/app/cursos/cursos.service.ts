import { JitEvaluator } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable()
export class CursosService {

  

  constructor() { }

  getCursos(){
    return[
      {id: 1, nome:'Java'},
      {id: 2, nome:'Angular'},
      {id:3, nome:'NodeJs'},
      {id: 4, nome:'MongoDB'},
      {id: 5, nome:'MySQL'}
    ]
  }

  getCurso(id: number){
    let cursos = this.getCursos();
    for(let i = 0;i < cursos.length;i++){
      let curso = cursos[i];
      if(curso.id == id){
        return curso;
      }
    }
    return null;
  }

}
