import { Component, Input, OnInit, Output } from '@angular/core';
import * as EventEmitter from 'events';
import { CamposListagem } from 'src/app/model/listagem/campos-listagem.model';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss']
})
export class ListagemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  @Input() objArrayCampos: CamposListagem[] = []
  @Input() objArrayItems = []

}
