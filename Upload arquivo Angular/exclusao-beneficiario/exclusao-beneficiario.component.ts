import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NzModalService } from "ng-zorro-antd/modal";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { SelectionInputComponent } from "src/app/components/selection-input/selection-input.component";
import { ITab } from "src/app/components/tabs/tabs.component";
import { ExclusaoBeneficiarioForm } from "src/app/forms/beneficiario/exclusao-beneficiario.form";
import { Beneficiario } from "src/app/models/beneficiario/beneficiario.model";
import { DataService } from "src/app/services/data.service";
import { To_Dash_Date } from "src/app/utils/utils";
import { environment } from "src/environments/environment";
import { ExclusaoBeneficiarioModalComponent } from "./exclusao-beneficiario-modal/exclusao-beneficiario-modal.component";
import { ExclusaoBeneficiarioService } from "./exclusao-beneficiario.service";

@Component({
    selector: "app-exclusao-beneficiario",
    templateUrl: "./exclusao-beneficiario.component.html",
    styleUrls: ["./exclusao-beneficiario.component.scss"]
})
export class ExclusaoBeneficiarioComponent implements OnInit, OnDestroy {

    /** @description Form Group para controlar o form */
    objFormGroup = this.exclusaoForm.Get_Form

    /** @description Arquivos que serão enviados para a Api */
    arquivos: File[] = []

    /** @description Funções para os selects */
    f_Motivos = this.exclusaoService.f_Motivos.bind(this.exclusaoService, this.objFormGroup.get("nr_Matricula"))
    f_Submotivos = this.exclusaoService.f_Submotivos.bind(this.exclusaoService, this.objFormGroup.get("cd_Motivo"))
    f_Contribuia = this.exclusaoService.f_Contribuia
    f_Beneficio = this.exclusaoService.f_Beneficio
    f_Motivo_Demissao = this.exclusaoService.f_Motivo_Demissao

    /** @description Caso true, a tela de finalização é mostrada  */
    b_Finalizado: boolean = false

    /** @description Unsubscribe para os observables */
    unsub = new Subject();

    /** @description Variavel que define se vai aparecer o submotivo ou nao na tela */
    b_Submotivo: boolean;

    /** @description cd_Movimentação da Exclusão */
    nr_Movimentacoes: string;

    /** @description Tabs para tela  */
    objArrayTabs: ITab[] = this.exclusaoService.objArrayTabs

    /** @description Index da tab  */
    nr_Index = 1

    /** @description Params para o select de beneficiário */
    objModalParams = this.exclusaoService.objModalParams

    /** @description Nome do arquivo */
    nm_Arquivo: string

    /** @description Dia limite da exclusão */
    dt_Limite_Exclusao: string

    /** @description Limita para a Data de hoje os campos de date  */
    dt_Minimo: string = To_Dash_Date(new Date())

    /** @description Limita para a Data de hoje os campos de date  */
    dh_Hoje = To_Dash_Date(new Date()) + "T00:00"

    /** @description Limita para a Data de hoje os campos de date  */
    dt_Maximo: string

    /** @description Texto que fica da parte superior da segunda página */
    ds_Texto_Arquivo: string

    /** @description Tipo de upload de arquivo */ /* 0 RN*/  /* 1 Carta demitido*/  /* 2 Óbito*/
    tp_Upload_Arquivo: number = 0;

    /** @description Variavel para abrir os campos de protocolo e data da adminsitradora */
    b_Administradora = false

    /** @description Nome do arquivo */
    @ViewChild("beneficiario", { static: false }) objInputBeneficiario: SelectionInputComponent

    constructor(
        private exclusaoForm: ExclusaoBeneficiarioForm,
        private exclusaoService: ExclusaoBeneficiarioService,
        private route: ActivatedRoute,
        private modalService: NzModalService,
        private dataService: DataService,
    ) { }

    async ngOnInit() {

        this.exclusaoForm.Desabilitar_Campos(this.objFormGroup)
        this.exclusaoForm.Observar_Campos(this.objFormGroup)

        this.exclusaoForm.b_Submotivo$.pipe(takeUntil(this.unsub)).subscribe((b_Submotivo) => {
            this.b_Submotivo = b_Submotivo
        });

        this.exclusaoForm.b_Administradora$.pipe(takeUntil(this.unsub)).subscribe((b_Administradora) => {
            this.b_Administradora = b_Administradora
        });

        this.exclusaoForm.dt_Limite_Exclusao$.pipe(takeUntil(this.unsub)).subscribe((dt_Limite_Exclusao) => {
            this.dt_Limite_Exclusao = dt_Limite_Exclusao

            const dt_Limite = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${this.dt_Limite_Exclusao} 00:00:00`)
            const dt_Hoje = new Date()
            dt_Hoje.setHours(0, 0, 0, 0)

            if (dt_Hoje > dt_Limite) {
                dt_Limite.setMonth(dt_Limite.getMonth() + 1)
                dt_Limite.setDate(1)

                this.dt_Minimo = To_Dash_Date(dt_Limite)
                this.objFormGroup.get("dt_Exclusao").setValue(To_Dash_Date(dt_Limite))
            }
        });

        this.objFormGroup.get("cd_Motivo").valueChanges.pipe(takeUntil(this.unsub)).subscribe((cd_Motivo) => {
            if (cd_Motivo == 2) {
                const dt_Hoje = new Date()
                const nr_Mes = this.exclusaoForm.dt_Limite_Exclusao$.value > dt_Hoje.getDate() ? 1 : 2
                const date = new Date(dt_Hoje.getFullYear(), dt_Hoje.getMonth() + nr_Mes, 0, 0, 0, 0);
                this.dt_Maximo = To_Dash_Date(date)
            } else {
                this.dt_Maximo = null
            }
        })

        setTimeout(async () => {
            const objBeneficiario: Beneficiario = this.route.snapshot.data.objExclusao

            if (objBeneficiario) {
                this.objFormGroup.get("nr_Matricula").setValue(objBeneficiario.nr_Matricula)
                this.objInputBeneficiario.control_Aux.setValue(objBeneficiario.nm_Beneficiario)
                this.objFormGroup.get("ds_Email").setValue(objBeneficiario.ds_Email)
                this.objFormGroup.get("nr_Celular").setValue(objBeneficiario.nr_Cel)
                this.objFormGroup.get("nr_Matricula").disable()

                this.exclusaoForm.dt_Limite_Exclusao$.next(this.dataService.Get_Session("subcontratos").find(s => s.cd_Subcontrato == objBeneficiario.cd_Subcontrato).dt_Limite_Exclusao)

                if (objBeneficiario.sn_Pendente_Anexo == "S") {
                    this.ds_Texto_Arquivo = objBeneficiario.ds_Pendencia

                    this.nr_Index = 2
                }

                if (objBeneficiario.cd_Motivo_Bloq == 3) {
                    this.tp_Upload_Arquivo = 1
                } else if (objBeneficiario.cd_Motivo_Bloq == 6) {
                    this.tp_Upload_Arquivo = 2
                }
            }
        });
    }

    async Salvar() {
        const ds_Termo_Responsabilidade = (await this.exclusaoService.Get_Termo_Responsabilidade())?.ds_Termo_Responsabilidade

        const modal = this.modalService.create({
            nzClosable: false,
            nzFooter: null,
            nzWidth: 800,
            nzContent: ExclusaoBeneficiarioModalComponent,
            nzComponentParams: { ds_Termo_Responsabilidade },
            nzWrapClassName: "center-modal",
            nzClassName: "modal-unimed"
        })

        const responseModal = await modal.afterClose.toPromise()

        if (responseModal) {
            const response = await this.exclusaoService.Set_Excluir_Beneficiario(this.objFormGroup.getRawValue())

            const objArrayMotivos = await this.exclusaoService.f_Motivos(this.objFormGroup.get("nr_Matricula") as FormControl)

            const sn_Protocolo_RN = this.dataService.Get_Session("subcontratos").some(s => s.sn_Protocolo_RN == "S") ? "S" : "N"

            if (objArrayMotivos.find(e => e.cd_Motivo == this.objFormGroup.get("cd_Motivo").value).b_Rn412 && sn_Protocolo_RN == 'N') {
                this.tp_Upload_Arquivo = 0
                this.nr_Index = 2
            } else if (this.objFormGroup.get("cd_Motivo").value == 3) {
                this.nr_Index = 2
                this.tp_Upload_Arquivo = 1
            } else if (this.objFormGroup.get("cd_Motivo").value == 6) {
                this.nr_Index = 2
                this.tp_Upload_Arquivo = 2
            } else {
                this.nr_Movimentacoes = response?.movimentacoes.join(", ")
                this.b_Finalizado = true
            }

            if (this.nr_Index == 2) {
                const beneficiario = await this.exclusaoService.Get_Beneficiario(this.objFormGroup.get("nr_Matricula").value)

                this.ds_Texto_Arquivo = beneficiario?.ds_Pendencia
            }
        }
    }

    async Abrir_Carta() {
        const ds_Token = (await this.exclusaoService.Get_Token_Carta_Exclusao(this.objFormGroup.get("nr_Matricula").value)).ds_Token
        window.open(environment.CONS_URL_APIBASE + "movimentacao/carta-exclusao?token=" + ds_Token, "_blank")
    }

    Adicionar_RN(ev: Event) {
        this.arquivos.push(...(ev.target ? (ev.target as any).files : ev))
    }

    Remover_Arquivo(index: number) {
        this.arquivos.splice(index, 1)
    }

    async Enviar_RN() {
        const ds_Token = (await this.exclusaoService.Get_Token_Carta_Exclusao(this.objFormGroup.get("nr_Matricula").value)).ds_Token
        const response = await this.exclusaoService.Set_Carta_Exclusao({ arquivos: this.arquivos, token: ds_Token })

        this.nr_Movimentacoes = response.movimentacoes.join(", ")
        this.b_Finalizado = true
    }

    Acender_Campos() {
        this.objFormGroup.markAllAsTouched()
    }

    ngOnDestroy() {
        this.unsub.next()
        this.unsub.complete()

        this.exclusaoForm.unsub.next()
        this.exclusaoForm.unsub.complete()
    }
}
