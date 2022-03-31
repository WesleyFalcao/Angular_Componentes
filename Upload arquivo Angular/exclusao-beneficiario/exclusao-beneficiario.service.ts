import { Injectable } from "@angular/core";
import { AdvancedSelectionModalComponent } from "src/app/components/advanced-selection-modal/advanced-selection-modal.component";
import { ITab } from "src/app/components/tabs/tabs.component";
import { EmpresaFacade } from "src/app/facade/empresa.facade";
import { ExclusaoBeneficiario } from "src/app/models/beneficiario/exclusao-beneficiario.model";
import { TabelaColuna } from "src/app/models/tabela/tabela-coluna.model";
import {FormControl} from "@angular/forms";

@Injectable({
    providedIn: "root"
})
export class ExclusaoBeneficiarioService {

    /** @description Colunas da Tabela de Vinculo */
    objArrayColunas: TabelaColuna[] = [
        { nm_Nome: "Nome", nm_Atributo: "nm_Beneficiario" },
        { nm_Nome: "Matrícula", nm_Class: "text-center", nm_Atributo: "nr_Matricula" },
        // { nm_Nome: "Tp. Usu.", nm_Class: "text-center", nm_Atributo: "tp_Usuario" },
        { nm_Nome: "Dt. Inclusão", nm_Class: "text-center", nm_Atributo: "dt_Inclusao", },
        { nm_Nome: "Plano", nm_Atributo: "nm_Plano", },
        { nm_Nome: "Tp. usu.", nm_Class: "text-center", nm_Atributo: "tp_Usuario", },
    ]

    /** @description Params para o select de beneficiário */
    objModalParams = {
        nr_Width: 1000,
        component: AdvancedSelectionModalComponent,
        nm_Class: "modal-unimed",
        objParamsComponent: {
            objArrayColunas: this.objArrayColunas,
            f_Carregar: this.f_Beneficiarios.bind(this),
            nm_Titulo: "Busca de beneficiário",
        }
    }

    /** @description Tabs para tela  */
    objArrayTabs: ITab[] = [{ ds_Titulo: "Beneficiário" }, { ds_Titulo: "Documentos" }]

    constructor(
        private empresaFacade: EmpresaFacade,
    ) { }

    Get_Token_Carta_Exclusao(nr_Matricula: string) {
        return this.empresaFacade.Get_Token_Carta_Exclusao(nr_Matricula)
    }

    Get_Beneficiario(nr_Matricula: string) {
        return this.empresaFacade.Get_Beneficiario(nr_Matricula)
    }

    Get_Termo_Responsabilidade() {
        return this.empresaFacade.Get_Termo_Responsabilidade()
    }

    Get_Submotivo_Listagem(cd_Motivo: number) {
        return this.empresaFacade.Get_Submotivo_Listagem(cd_Motivo)
    }

    Set_Excluir_Beneficiario(objMovimentacao: ExclusaoBeneficiario) {
        return this.empresaFacade.Set_Excluir_Movimentacao(objMovimentacao)
    }

    Set_Carta_Exclusao({ arquivos, token }: { arquivos: File[], token: string }) {
        return this.empresaFacade.Set_Carta_Exclusao({ arquivos, token })
    }

    async f_Beneficiarios(nr_Pagina: number, component: AdvancedSelectionModalComponent) {
        return (await this.empresaFacade.Get_Beneficiarios_Exclusao({
            page: nr_Pagina,
            b_Titular: false,
            pageLength: component.nr_Page_Length,
            nm_Beneficiario: component.formControl.value,
        }))
    }

    Get_Beneficiario_Tempo_Contribuicao(nr_Matricula: string) {
        return this.empresaFacade.Get_Beneficiario_Tempo_Contribuicao(nr_Matricula)
    }

    f_Motivos(nr_Matricula: FormControl) {
        return this.empresaFacade.Get_Motivo_Listagem(nr_Matricula.value)
    }

    f_Submotivos(cd_Motivo: FormControl) {
        return this.empresaFacade.Get_Submotivo_Listagem(cd_Motivo.value)
    }

    f_Contribuia() {
        return [
            { sn_Contribuia: "S", nm_Contribuia: "Sim" },
            { sn_Contribuia: "N", nm_Contribuia: "Não" },
        ]
    }

    f_Beneficio() {
        return [
            { cd_Beneficio: 1, nm_Beneficio: "Sim" },
            { cd_Beneficio: 0, nm_Beneficio: "Não" },
            { cd_Beneficio: 2, nm_Beneficio: "Quero informar manualmente na carta" },
        ]
    }

    f_Motivo_Demissao() {
        return [
            { cd_Motivo_Demissao: 1, nm_Motivo_Demissao: "Demitido/Exonerado sem justa causa" },
            { cd_Motivo_Demissao: 2, nm_Motivo_Demissao: "Aposentado" },
            { cd_Motivo_Demissao: 3, nm_Motivo_Demissao: "Aposentado que continuava trabalhando na empresa foi demitido/exonerado" },
            { cd_Motivo_Demissao: 4, nm_Motivo_Demissao: "Demitido/Exonerado com justa causa" },
        ]
    }
}
