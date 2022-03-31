import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ButtonModule } from 'src/app/components/button/button.module';
import { TitleModule } from 'src/app/components/title/title.module';
import { ExclusaoBeneficiarioModalComponent } from './exclusao-beneficiario-modal.component';


@NgModule({
    declarations: [
        ExclusaoBeneficiarioModalComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        TitleModule,
        ButtonModule,
    ],
    providers: [],
})
export class ExclusaoBeneficiarioModalModule { }
