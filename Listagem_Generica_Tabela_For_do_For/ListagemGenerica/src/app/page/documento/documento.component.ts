import { Component, OnInit } from '@angular/core';
import { CamposListagem } from 'src/app/model/listagem/campos-listagem.model';

@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.scss']
})
export class DocumentoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.Buscar_Documentos()
  }
  
  objArrayDocumentos = []
  objArrayCampos: CamposListagem[] = [

    { nm_Exibicao: "Nome", nm_Classe: "w-80 md:w-5/12", nm_Atibruto: "nm_Documento" },
    { nm_Exibicao: "Código", nm_Classe: "w-80 w-2/12", nm_Atibruto: "cd_Qualidade" },
    { nm_Exibicao: "Processos", nm_Classe: "w-80 w-2/12", nm_Atibruto: "nm_Processo" },
    { nm_Exibicao: "Revisão", nm_Classe: "w-80 w-1/12", nm_Atibruto: "nr_Revisao" },
    { nm_Exibicao: "Data", nm_Classe: "w-80 w-2/12", nm_Atibruto: "dt_Documento" },
  ]

  async Buscar_Documentos() {
    //const objParams: DocumentosParams = { nr_Page: this.nr_Page, nr_Page_Length: this.nr_Page_Length, nm_Search: this.nm_Search, cd_Setor_CEQ: this.cd_Setor_CEQ }
    //const objRetorno = await this.documentosService.Get_Documentos(objParams)
    //this.objArrayDocumentos = objRetorno.data
  }
}
