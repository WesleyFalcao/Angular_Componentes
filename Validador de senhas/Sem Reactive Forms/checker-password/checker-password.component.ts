import { Component, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-checker-password',
  templateUrl: './checker-password.component.html',
  styleUrls: ['./checker-password.component.scss']
})

export class CheckerPasswordComponent {

  /**@description Recebe o objeto do formulário */
  @Input() Password: any

  /**@description Recebe o objeto do formulário */
  @Input() Password_Confirmation: any

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

  /**@description Variável para controlar a classe do indicativo de senha */
  sn_Confirm_Password: boolean = false

  ngOnChanges(changes: SimpleChange) {

    if (this.Password != null) {
      if (changes['Password']?.currentValue != changes['Password']?.previousValue) {
        this.Checker_Password()
      }
    }

    if (this.Password_Confirmation != null) {
      if (changes['Password_Confirmation']?.currentValue != changes['Password_Confirmation']?.previousValue) {
        console.log("alterou")
        this.Confirmation_Password()
      }
    }
  }

  Checker_Password() {
    console.log(this.Password)

    if (this.Password.length >= 8) {
      this.sn_Length = true
    } else {
      this.sn_Length = false
    }

    if (this.Password.match("((?=.*[!@#$%^&*]))")) {
      this.sn_Special_Character = true
    } else {
      this.sn_Special_Character = false
    }

    if (this.Password.match("((?=.*[a-z]))")) {
      this.sn_Lower_Case = true
    } else {
      this.sn_Lower_Case = false
    }

    if (this.Password.match("(?=.*[A-Z])")) {
      this.sn_Upper_Case = true
    } else {
      this.sn_Upper_Case = false
    }

    if (this.Password.match("([0-9])")) {
      this.sn_Number = true
    } else {
      this.sn_Number = false
    }

    if(this.Password != '' && this.Password == this.Password_Confirmation){
      this.sn_Confirm_Password = true
    } else {
      this.sn_Confirm_Password = false
    }
  }

  Confirmation_Password() {
    if (this.Password_Confirmation == this.Password && this.Password != null) {
      this.sn_Confirm_Password = true
    } else {
      this.sn_Confirm_Password = false
    }
  }
}
