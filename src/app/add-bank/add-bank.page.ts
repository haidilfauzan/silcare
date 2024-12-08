import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-bank',
  templateUrl: './add-bank.page.html',
  styleUrls: ['./add-bank.page.scss'],
})
export class AddBankPage implements OnInit {

  constructor(public app: AppService,
    public router: Router
  ) { }

  bank: any = {};

  simpan() {
    
    this.app.add('bank', this.bank).then(umkmCredential => {
      if (umkmCredential && umkmCredential.id) {
        console.log(umkmCredential.id);
        this.app.getRecordsByField('user', 'email', this.app.userlogin.email,'==').subscribe(records => {
          console.log(this.app.userlogin);
        this.app.userlogin = records[0];
        console.log(this.app.userlogin);
        this.app.userlogin['bank'] = umkmCredential.id;
        this.app.update('user',this.app.userlogin.id,this.app.userlogin).then(()=>{
          this.app.toast('taken');
          this.router.navigate(['tabs']);
        })
      });
        
      }
        
    })}


  ngOnInit() {
  }

}
