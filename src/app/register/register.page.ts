import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: any = {};
  constructor(
    public router: Router,
    public app: AppService,
    private firestore: AngularFirestore,
  ) { }

  createuser(){

    this.app.createuser(this.user.email, this.user.password).then(userCredential => {
      if (userCredential && userCredential.user) {
        const userId = userCredential.user.uid;
        if (userId){
          console.log(userId,this.user)
          this.app.createDocumentWithId('user', userId,
            {email :this.user.email,
            name: this.user.name,
            phone: this.user.phone,
            role: this.user.role
            }).then(() => {
              console.log('User document successfully created');
              this.app.sendEmailForVarifiction(userCredential.user);
              this.app.logout();
              
              // Handle successful document creation (e.g., show a success message, navigate to another page)
            }).catch(error => {
              console.error('Error creating document:', error);
              this.app.toast(this.app.cleanErrorMessage(error.message));
              // Handle errors in document creation
            });
          // this.app.logout();
        }
      }
    }).catch(error => {
      console.error('Error creating user:', error);
      this.app.toast(this.app.cleanErrorMessage(error.message));
      // Handle errors in user creation
    });
  }

  ngOnInit() {
  }

}
