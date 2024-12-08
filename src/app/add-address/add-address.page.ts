import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {
  alamat: any = {};

  kecamatanKeys: string[] = Object.keys(this.app.kecamatan);
  constructor( public app: AppService,public router: Router) { }

  simpan() {
    this.app.update('user',this.app.userlogin.id,{address:this.alamat}).then(() => {
      this.app.user(this.app.userlogin.id).subscribe(user=>{this.app.userlogin = user})
      this.alamat['user'] = this.app.userlogin.id;
      this.app.add('address',this.alamat).then(() => {
      this.app.toast('address is added');
      this.router.navigate(['tabs']);
    })
    })
    
    
  }
        

  ngOnInit() {
  }

}
