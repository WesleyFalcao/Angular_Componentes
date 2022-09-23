import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss']
})
export class CaptchaComponent implements OnInit {

  captcha: string
  email: string

  constructor() { 
    this.captcha = '';
    this.email = 'Secret@email.com'
  }

  ngOnInit(): void {
  }

  resolved(captchaResponse: string){
    this.captcha = captchaResponse
    console.log("resolvido captcha" + this.captcha)
  }
}
