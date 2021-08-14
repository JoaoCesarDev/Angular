import { AlunosService } from './../alunos.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { aluno } from '../aluno';

@Component({
  selector: 'app-aluno-detalhe',
  templateUrl: './aluno-detalhe.component.html',
  styleUrls: ['./aluno-detalhe.component.css']
})
export class AlunoDetalheComponent implements OnInit {

  id:number;
  inscrição:Subscription;
  aluno:aluno;

  constructor(private router:Router, private route: ActivatedRoute,private alunosService:AlunosService) { }

  ngOnInit(): void {
    /*this.inscrição = this.route.params.subscribe((params:any) =>{
      this.id = params['id'];
      this.aluno = this.alunosService.getAluno(this.id);
      if(this.aluno == null){
        this.aluno = {};
      }
    }
    );*/
    this.inscrição = this.route.data.subscribe((info:{aluno})=>{
      console.log(info);
      this.aluno = info.aluno;
    })
  }

  editarAluno(){
    this.router.navigate(['/alunos',this.aluno.id,'editar'])
  }

  ngOnDestroy(){
    this.inscrição.unsubscribe();
  }

}
