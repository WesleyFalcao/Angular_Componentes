import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  formulario: FormGroup

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      name: [null, Validators.required, Validators.min(3)],
      email: [null, Validators.required, Validators.email, Validators.max(200)],
      cpf: [null, Validators.pattern('[0-9]*')],
      adress: this.formBuilder.group({
        zip: [null],
      })
    })
  }

  onSubmit(){
    //Assim que se pega o valor dos campos do formulário
    this.formulario.value
    console.log(this.formulario.value)

    //O ideal é resetar o formulário quando receber uma resposta de sucesso do servidor
    this.formulario.reset()
  }
}
