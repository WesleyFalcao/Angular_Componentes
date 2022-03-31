import { Component, OnInit } from "@angular/core";
import { NzModalRef } from "ng-zorro-antd/modal";

@Component({
    selector: "app-exclusao-beneficiario-modal",
    templateUrl: "./exclusao-beneficiario-modal.component.html",
    styleUrls: ["./exclusao-beneficiario-modal.component.scss"]
})
export class ExclusaoBeneficiarioModalComponent implements OnInit {

    /** @description String do Termo de Responsabilidade */
    ds_Termo_Responsabilidade: string

    constructor(
        private modal: NzModalRef,
    ) { }

    ngOnInit() {

    }

    Aceitar() {
        this.modal.close(true)
    }

    Voltar() {
        this.modal.close(false)
    }
}