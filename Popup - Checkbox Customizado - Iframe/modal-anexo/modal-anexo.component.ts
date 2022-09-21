import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CadastralFacade } from 'src/app/facade/cadastral.facade';
import { MovimentacaoInclusaoAnexoEmpresa } from 'src/app/models/movimentacao/movimentacao-inclusao-detalhe.model';
import { SubjectService } from 'src/app/services/subject.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-anexo',
  templateUrl: './modal-anexo.component.html',
  styleUrls: ['./modal-anexo.component.scss']
})
export class ModalAnexoComponent implements OnInit {

  /**@description Abre e fecha o modal  */
  b_Mostral_Modal: boolean = false

  /** @description Array de anexos */
  objArrayAnexos: MovimentacaoInclusaoAnexoEmpresa[] = []

  /**@description Recebe os parâmetros do poPup */
  ds_Param: string = "height=700,width=800,left=500,top=400,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes"

  /**@description Recebe o ID da movimentação */
  cd_Movimentacao: number

  /**@description Boolean para decidir se exibe ou não a primeira parte do Popup */
  b_Exibir: boolean

  /**@description String que contém o nome do anexo selecionado que vai no título */
  nm_Title_Anexo: string

  constructor(
    private subject_Service: SubjectService,
    private cadastralFacade: CadastralFacade,
    public route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subject_Service.subject_Exibindo_Bar.next(false)
    this.Get_Query_Params()
    this.Buscar_Anexos()
  }

  Get_Query_Params() {
    this.route.queryParams.subscribe(param => this.cd_Movimentacao = param.cd_Movimentacao)
    console.log("this.cd_Movimentacao", this.cd_Movimentacao)
  }

  async Buscar_Anexos() {
    this.objArrayAnexos = await this.cadastralFacade.Get_Movimentacao_Inclusao_Anexos_Empresa(this.cd_Movimentacao)
    console.log(this.objArrayAnexos)
  }

  Visualizar_Anexos(anexo) {
    this.router.navigate(['/anexo-detalhe'], {
      queryParams: {
        cd_Movimentacao: this.cd_Movimentacao,
        cd_Anexo: anexo.cd_Anexo,
        nm_Tipo_Arquivo: anexo.nm_Tipo_Arquivo
      }
    })
  }

  Voltar() {
    this.b_Exibir = true
  }
}
