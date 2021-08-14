import { cidades } from './cidades';
import { validacoes } from './../shared/Validacoes';
import { ConsultaCepService } from './consulta-cep.service';
import { ListasService } from './../shared/listas.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { estados } from './estados';
import { EMPTY, Observable, } from 'rxjs';
import * as M from 'materialize-css';
import { camposIguaisValidator } from '../shared/DiretivaCamposIguais';
import { distinctUntilChanged, map, tap} from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { BaseFormComponent } from '../shared/base-form/base-form.component';

declare var $: any;

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent extends BaseFormComponent implements OnInit {

  instance;
 // form:FormGroup;
  estados:estados[];
  cidades: cidades[];
  cargos:any[];
  tecnologias:any[];
  newsletter:any[];
  termo:boolean;
  frameworksData:any[];


  constructor(private formBuilder:FormBuilder,private http: HttpClient,private listasService:ListasService,
              private consultaCepService:ConsultaCepService) {
                super();
                }

  ngOnInit(): void {
     // this.carregarSelect();
      this.listasService.getEstadosBr()
      .subscribe(dados => this.estados = dados);

      this.cargos = this.listasService.getCargos();
      this.tecnologias = this.listasService.getTecnologias();
      this.newsletter = this.listasService.getNewsLetter();
      this.frameworksData = this.listasService.getframeworksData();
      //this.listasService.verificarEmail('chamber@djow.com').subscribe();
      this.form = this.formBuilder.group({
        nome:[null,[Validators.required,Validators.minLength(5),Validators.maxLength(10)]],
        email:[null,[Validators.required,Validators.email],this.validarEmail.bind(this)],
        confirmarEmail:[null,[Validators.required,Validators.email]],
        endereco:this.formBuilder.group({ cep:[null,[Validators.required,validacoes.cepValidator]],
                                          numero:[null,[Validators.required]],
                                          complemento:[null],
                                          rua:[null,[Validators.required]],
                                          bairro:[null,[Validators.required]],
                                          cidade:[null,[Validators.required]],
                                          estado:[null]
                                        }),
        cargo:[null],
        tecnologia:[null],
        newsletter:['s'],
        termos:[true,Validators.pattern('true')],
        frameworks:new FormArray([], validacoes.requiredMinCheckbox(1))
      },{validators:camposIguaisValidator});
      this.buildFrameworks();
      this.consultaCEP();
    /*this.form = new FormGroup({
      nome: new FormControl(null),
      email: new FormControl(null)
    });*/


  }

  submit() {
    let valueSubmit = Object.assign({},this.form.value);

     valueSubmit = Object.assign(valueSubmit,{
      frameworks: valueSubmit.frameworks
      .map((checked, i) => checked ? this.frameworksData[i].nome : null)
      .filter(v => v !== null)
    });

      this.http.post('https://httpbin.org/post',JSON.stringify(valueSubmit))
      .subscribe(dados => {console.log(dados),
      //reseta o form
      this.reset()}
      );

  //      this.selectedFrameworks();
  }


  get FrameworksFormArray(){
    return this.form.controls.frameworks as FormArray;
  }

  private selectedFrameworks(){
    const selectedFrameworksIds = this.form.value.frameworks
      .map((checked, i) => checked ? this.frameworksData[i].nome : null)
      .filter(v => v !== null);
    return selectedFrameworksIds;
  }



  private buildFrameworks(){

    this.frameworksData.forEach(() => this.FrameworksFormArray.push(new FormControl(false)));

    /*const values = this.frameworks.map(v => new FormControl(false));
    return this.formBuilder.array(values);*/
  }



  override; reset(){
    this.form.reset();
    setTimeout(() => {
      this.form.get('termos').setValue(true);
      this.form.get('newsletter').setValue('s');
    }, 500);

  }

  consultaCEP(){
/*
    const cep = this.form.get('endereco.cep').value;

    if(cep != null && cep !== ""){
      this.resetaDadosform();
      this.consultaCepService.consultaCEP(cep)
      .subscribe(dados => this.populaDadosForm(dados));

    }*/
    this.form.get('endereco.cep').statusChanges
      .pipe(
        distinctUntilChanged(),
        tap(value =>console.log('Cep Status:' , value)),
        switchMap(status => status === 'VALID'?
        this.consultaCepService.consultaCEP(this.form.get('endereco.cep').value) : EMPTY)
      )
      .subscribe(dados => dados ?  this.populaDadosForm(dados) : {} );

      this.form.get('endereco.estado').valueChanges
      .pipe(
        tap(estado =>console.log('novo estado:', estado)),
        map(estado => this.estados.filter(e => e.sigla === estado)),
        map(estados => estados && estados.length > 0 ? estados[0].id : EMPTY),
        switchMap(estadoId => this.listasService.getCidades(estadoId)),
        tap(console.log)
      )
      .subscribe(cidades => this.cidades = cidades);
  }
  populaDadosForm(dados){

    this.form.patchValue({
      endereco:{
        rua: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
  }

  resetaDadosform(){
    this.form.patchValue({
      endereco:{
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null

      }
    });
  }

  setarTecnologias(){
    const cargo =  {nome:'Dev', nivel: 'Pleno', Descricao:'Dev Pl'};
    this.form.get('cargo').setValue(cargo);
  }
  compararcargo(obj1,obj2){
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2;
  }
  carregarSelect(){
    setTimeout(() => {
      $('select').formSelect();
    }, 500);
  }
  onCheckboxChange(e) {
    if(!e.target.checked){
      this.termo = true;
    }else{this.termo = false;}
  }

  verificarIgual():boolean{
    return this.form.hasError('camposNaoSaoIguais') &&
    this.form.get('confirmarEmail').dirty &&
    this.form.get('confirmarEmail').touched ;

  }

  validarEmail(formControl:FormControl){
    return this.listasService.verificarEmail(formControl.value)
    .pipe(map(emailExiste => emailExiste ? {emailInvalido:true}:null));
  }

}
