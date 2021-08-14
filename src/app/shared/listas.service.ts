import { cidades } from './../form/cidades';
import { estados } from './../form/estados';
import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ListasService {

  constructor(private http:HttpClient) { }

  getEstadosBr():Observable<any>{
    return this.http.get<estados[]>('/assets/listas/estadosBR.json')
    .pipe(map(res => res));
  }

  getCidades(idEstado){
    return this.http.get<cidades[]>('/assets/listas/cidades.json')
    .pipe(map((cidades: cidades[]) => cidades.filter( c => c.estado == idEstado)));
  }

  getCargos(){
    return [
      {nome:'Dev', nivel: 'Júnior', Descricao:'Dev Jr'},
      {nome:'Dev', nivel: 'Pleno', Descricao:'Dev Pl'},
      {nome:'Dev', nivel: 'Senior', Descricao:'Dev Se'}
    ];
  }



  getTecnologias(){
    return [
      {nome:'java', desc:'Java'},
      {nome:'javascript', desc:'JavaScript'},
      {nome:'php', desc:'PHP'},
      {nome:'phyton', desc:'Phyton'},
      {nome:'typescript', desc:'TypeScript'}
    ]
  }

  getNewsLetter(){
    return [
      {valor:'s', desc:'Sim'},
      {valor:'n', desc:'Não'}
    ]
  }

  getframeworksData(){
   return [
      {id:'01', nome:'Angular'},
      {id:'02', nome:'Spring'},
      {id:'03', nome:'Materialize'},
      {id:'04', nome:'Django'}
    ];
  }

  verificarEmail(email:string){
    return this.http.get('/assets/listas/verificarEmail.json')
    .pipe(
      delay(3000),
      map((dados:{emails:any[]}) => dados.emails),
     // tap(console.log),
      map((dados:{email:string}[]) => dados.filter(v => v.email === email)),
     // tap(console.log),
      map((dados:any[])=> dados.length > 0)
     // tap(console.log)
     );

  }

}
