import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Route } from '@angular/router';
import { CadastralFacade } from 'src/app/facade/cadastral.facade';
import { MovimentacaoInclusaoAnexoEmpresa } from 'src/app/models/movimentacao/movimentacao-inclusao-detalhe.model';
import { SubjectService } from 'src/app/services/subject.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-anexo-detalhe',
  templateUrl: './modal-anexo-detalhe.component.html',
  styleUrls: ['./modal-anexo-detalhe.component.scss']
})
export class ModalAnexoDetalheComponent implements OnInit {

  /**@description Recebe o ID da movimentação */
  cd_Movimentacao: string

  /**@description Recebe o ID do anexo selecionado */
  cd_Anexo: string

  /** @description Array de anexos */
  objArrayAnexos: MovimentacaoInclusaoAnexoEmpresa[] = []

  /** @description Array de anexos */
  objArrayAnexosFilter: MovimentacaoInclusaoAnexoEmpresa[] = []

  /**@description Recebe o nome do anexo selecionado na página anterior */
  nm_Tipo_Arquivo: string

  /**@description Contém a Url que vai ser usada pelo iframe */
  ds_Url: any

  /**@description Array que vai receber a verificações a serem feitas */
  objArrayVerificacoes = [
    {
      nm_Verificacao: "Verificação 1",
      sn_Okay: false
    },
    {
      nm_Verificacao: "Verificação 2",
      sn_Okay: false
    },
    {
      nm_Verificacao: "Verificação 3",
      sn_Okay: false
    },
  ]

  Verification: any

  constructor(
    public route: ActivatedRoute,
    private subject_Service: SubjectService,
    private cadastralFacade: CadastralFacade,
    private location: Location,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.subject_Service.subject_Exibindo_Bar.next(false)
    this.Get_Query_Params()
    this.Buscar_Anexos()
  }

  Get_Query_Params(){
    this.route.queryParams.subscribe(param => {
      this.cd_Movimentacao = param.cd_Movimentacao
      this.cd_Anexo = param.cd_Anexo
      this.nm_Tipo_Arquivo = param.nm_Tipo_Arquivo
    })
  }

  async Buscar_Anexos(){
    const cd_Movimentacao = Number(this.cd_Movimentacao) 
    this.objArrayAnexos = await this.cadastralFacade.Get_Movimentacao_Inclusao_Anexos_Empresa(cd_Movimentacao)
    this.objArrayAnexosFilter = this.objArrayAnexos.filter(anexo =>{
      return anexo.cd_Anexo == Number(this.cd_Anexo)
    })
    console.log(this.objArrayAnexosFilter)
    this.Criar_Url()
  }

  Criar_Url(){
    this.ds_Url = `${environment.CONS_URL_APIBASE}movimentacao-inclusao/anexos?token=${this.objArrayAnexosFilter[0].ds_Token}`
    console.log(this.ds_Url)
    //this.cpt_pdf = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.uri}files/cpt?cd_vida=${this.cd_Vida}&token=${this.perguntasDeclaraoSaude.link_CPT}`);
    // window.open(environment.CONS_URL_APIBASE + "movimentacao-empresa/anexos?token=" + anexo.ds_Token, "_blank")
  }

  Voltar(){
    this.location.back()
  }
}
