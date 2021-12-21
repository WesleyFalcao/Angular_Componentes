import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentoComponent } from './documento.component';
import { ListagemModule } from 'src/app/components/listagem/listagem.module';


@NgModule({
  declarations: [
    DocumentoComponent
  ],
  imports: [
    CommonModule,
    ListagemModule
  ],
  exports: [
    DocumentoComponent
  ]
})
export class DocumentoModule { }
