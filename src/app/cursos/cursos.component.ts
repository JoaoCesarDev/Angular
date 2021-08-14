import { CursosService } from './cursos.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  cursos:any[];
  pagina:number;
  pageInscription:Subscription;

  constructor(private route:ActivatedRoute, private router:Router, private cursosService:CursosService) { }

  ngOnInit(): void {
    this.cursos = this.cursosService.getCursos();
    this.pageInscription = this.route.queryParams.subscribe(
      (queryParams:any)=>{
        this.pagina = queryParams['pagina'];
      }
    )
  }

  ngOnDestroy(){
    this.pageInscription.unsubscribe();
  }

  proximaPagina(){
    //this.pagina++;
    this.router.navigate(['/cursos'],
    {queryParams:{'pagina':++this.pagina}}
    );
  }

}
