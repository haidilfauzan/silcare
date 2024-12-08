import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {

  email: string = '';
  constructor(
    public app: AppService,
  ) { }

  send(){
    if (this.email) {

      this.app.forgetPassword(this.email)
    }
  }

  ngOnInit() {
  }

}
