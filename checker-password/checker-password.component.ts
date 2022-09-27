import { Component, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-checker-password',
  templateUrl: './checker-password.component.html',
  styleUrls: ['./checker-password.component.scss']
})

export class CheckerPasswordComponent {

  /**@description Recebe o objeto do formulário */
  @Input() objForm: any

  /**@description Variável para abrir e fechar o modal de alerta */
  sn_Exibir_Modal: boolean = false

  /**@description Variável para controlar a classe do indicativo de senha */
  sn_Length: boolean = false

  /**@description Variável para controlar a classe do indicativo de senha */
  sn_Special_Character: boolean = false

  /**@description Variável para controlar a classe do indicativo de senha */
  sn_Lower_Case: boolean = false

  /**@description Variável para controlar a classe do indicativo de senha */
  sn_Upper_Case: boolean = false

  /**@description Variável para controlar a classe do indicativo de senha */
  sn_Number: boolean = false

  ngOnChanges(changes: SimpleChange) {
    if (changes['objForm'].currentValue != changes['objForm'].previousValue) {
      this.Checker_Password()
    }
  }

  Checker_Password() {
    this.objForm.get("senha").valueChanges.subscribe(form => {

      if (form.length >= 8) {
        this.sn_Length = true
      } else {
        this.sn_Length = false
      }

      if (form.match("((?=.*[!@#$%^&*]))")) {
        this.sn_Special_Character = true
      } else {
        this.sn_Special_Character = false
      }

      if (form.match("((?=.*[a-z]))")) {
        this.sn_Lower_Case = true
      } else {
        this.sn_Lower_Case = false
      }

      if (form.match("(?=.*[A-Z])")) {
        this.sn_Upper_Case = true
      } else {
        this.sn_Upper_Case = false
      }

      if (form.match("([0-9])")) {
        this.sn_Number = true
      } else {
        this.sn_Number = false
      }
    })
  }
}
