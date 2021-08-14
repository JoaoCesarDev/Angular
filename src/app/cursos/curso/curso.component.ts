import { CursosService } from '../cursos.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  id:number;
  inscrição:Subscription;
  curso:any;

  constructor(private router:Router, private route: ActivatedRoute,private cursosService:CursosService) { 
    //this.id  =this.route.snapshot.params['id'] ;
  }

  ngOnInit(): void {
   this.inscrição = this.route.params.subscribe((params:any) =>{
      this.id = params['id'];
      this.curso = this.cursosService.getCurso(this.id);
      if(this.curso == null){
        this.router.navigate(['/cursos/naoEncontrado']);
      }
    }
    );
  }

  ngOnDestroy():void{
    this.inscrição.unsubscribe;
  }

}
