import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AdvancedSelectionModalModule } from 'src/app/components/advanced-selection-modal/advanced-selection-modal.module';
import { AlertModalModule } from 'src/app/components/alert-modal/alert-modal.module';
import { AvisoCriticaModule } from 'src/app/components/aviso-critica/aviso-critica.module';
import { AvisoModule } from 'src/app/components/aviso/aviso.module';
import { ButtonModule } from 'src/app/components/button/button.module';
import { CheckboxModule } from 'src/app/components/checkbox/checkbox.module';
import { InputModule } from 'src/app/components/input/input.module';
import { ProgressTabModule } from 'src/app/components/progress-tab/progress-tab.module';
import { RadioButtonModule } from 'src/app/components/radio-button/radio-button.module';
import { SelectionInputModule } from 'src/app/components/selection-input/selection-input.module';
import { SuccessScreenModule } from 'src/app/components/success-screen/success-screen.module';
import { TitleModule } from 'src/app/components/title/title.module';
import { DragDropModule } from 'src/app/directives/drag-drop/drag-drop.module';
import { ExclusaoBeneficiarioModalModule } from './exclusao-beneficiario-modal/exclusao-beneficiario-modal.module';
import { ExclusaoBeneficiarioComponent } from './exclusao-beneficiario.component';

@NgModule({
    declarations: [
        ExclusaoBeneficiarioComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        TitleModule,
        InputModule,
        SelectionInputModule,
        ButtonModule,
        RadioButtonModule,
        CheckboxModule,
        SuccessScreenModule,
        ExclusaoBeneficiarioModalModule,
        AdvancedSelectionModalModule,
        ProgressTabModule,
        AvisoCriticaModule,
        AngularSvgIconModule.forRoot(),
        DragDropModule,
        AvisoModule,
        AlertModalModule
    ],
    providers: [],
})
export class ExclusaoBeneficiarioModule { }
