import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IFormCanDeactivate } from 'src/app/guards/iform-candactivate';
import { AlunosService } from '../alunos.service';

@Component({
  selector: 'app-alunos-form',
  templateUrl: './alunos-form.component.html',
  styleUrls: ['./alunos-form.component.css']
})
export class AlunosFormComponent implements OnInit, IFormCanDeactivate {

  inscrição:Subscription;
  aluno:any;
  private formMudou:Boolean = false;

  constructor( private route: ActivatedRoute,private alunosService:AlunosService) { }
  podeDesativar() {
    return this.podeMudarRota();
  }

  ngOnInit(): void {
    this.inscrição = this.route.params.subscribe((params:any) =>{
      let id = params['id'];
      this.aluno = this.alunosService.getAluno(id);
      if(this.aluno == null){
        this.aluno = {};
      }
  }
  );
  }
  onInput(){
    this.formMudou = true;
  }
  podeMudarRota(){
    if(this.formMudou){
    confirm('Tem certeza que deseja sair da página?')
    }
    return true;
  }
}
