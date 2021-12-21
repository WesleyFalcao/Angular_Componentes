import { DocumentoComponent } from './page/documento/documento.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ListagemComponent } from './components/listagem/listagem.component';
import { ListagemModule } from './components/listagem/listagem.module';
import { DocumentoModule } from './page/documento/documento.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ListagemModule,
    DocumentoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
