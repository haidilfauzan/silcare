import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';

import * as firebase from 'firebase/app';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  private userSubscription: Subscription | undefined;
  constructor(
    public router: Router,
    public app: AppService,
  ) { }
  


  masuk() {
    this.app.login(this.email, this.password).then(async userCredential => {
      if (userCredential && userCredential.user?.emailVerified) {
        const uid = userCredential.user.uid;
        const token = await userCredential.user.getIdToken();
        this.app.setSession(uid, token);
        this.userSubscription = this.app.user(uid).subscribe((res: any) => {
          console.log(res,uid);
          this.app.userlogin = res;
          this.app.userlogin['id'] = uid
          if (res.role === 'admin' || res.role === 'user') {
            this.router.navigate(['tabs','tab3']);
          } else if (res.role === 'courier'){
            this.router.navigate(['tabs','courier']);
          }else {
            this.app.toast('Access denied');
            this.app.logout();
          }
          console.log(this.app.userlogin);
        });
      } else if(!userCredential.user?.emailVerified){
        this.app.toast('email tidak verified');
      }else {
        this.app.toast('Login failed');
        this.email = '';
        this.password = '';
      }
    }).catch((err: firebase.FirebaseError) => {
        this.email = '';
        this.password = '';
        if (err.code == 'auth/invalid-email') {this.app.toast('email salah');}
        console.log(err.code);
      })
    }

  ngOnInit() {
  }

}
