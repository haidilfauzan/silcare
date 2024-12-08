import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  umkm:any = {};
  bank:any = {};
  email:string = '';
  id: string | null = null; 
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public app: AppService,
    private toastController: ToastController,
  ) {
    
   }

   ionViewDidEnter(){
    this.bank['id'] = this.app.userlogin.bank;
    this.umkm['id'] = this.app.userlogin.umkm;
    this.id = this.app.userlogin.id;
    if(this.umkm['id']){
      this.app.doc('umkm', this.umkm['id']).subscribe(res => {
        this.umkm = res;
      })

    }
    
  }

  send(){
    if (this.app.userlogin.email) {

      this.app.forgetPassword(this.app.userlogin.email)
    }
  }

  public emailButtons = [ {
    text: 'Cancel',
    role: 'cancel',
    handler: () => {
      console.log('Alert canceled');
    },
  },{text:'OK',handler: (data:any) => {
    this.email = data[0];
  //   console.log(data[0],this.product.stock)
    this.onChangeEmail()
  }}];
 public emailInputs = [
   {
      type: 'email',
      placeholder: 'email',
   },
 ];

 async onChangeEmail() {
  if (this.email) {
    await this.app.changeEmail(this.email);
  } else {
    const toast = await this.toastController.create({
      message: 'Please enter a valid email address.',
      duration: 2000,
      color: 'warning'
    });
    await toast.present();
  }
}



  public umkmButtons = [ {
    text: 'Cancel',
    role: 'cancel',
    handler: () => {
      console.log('Alert canceled');
    },
  },{text:'OK',handler: (data:any) => {
    this.umkm['name'] = data[0];
    this.umkm['description']  = data[1];
  //   console.log(data[0],this.product.stock)
    this.app.getRecordsByField('umkm', 'email', this.app.userlogin.email,'==').subscribe((records:any[]) => {
      if (this.id){
        this.app.update('umkm',records[0].id,this.umkm).then(()=>{
          this.app.toast('umkm update')
        }).catch(error => {
          console.error('Error updating document:', error);
          this.app.toast('Error updating stock. Document may not exist.');
        });
      }

    })
  }}];
 public umkmInputs = [
   {
      placeholder: 'name',
   },
   {
    type: 'textarea',
    placeholder: 'description',
  },
 ];




 public bankButtons = [ {
  text: 'Cancel',
  role: 'cancel',
  handler: () => {
    console.log('Alert canceled');
  },
},{text:'OK',handler: (data:any) => {
  this.bank['name'] = data[0];
  this.bank['number']  = data[1];
  console.log(this.bank['id'])

    if (this.id){
      this.app.update('bank',this.bank['id'],this.bank).then(()=>{
        this.app.toast('bank update')
      }).catch(error => {
        console.error('Error updating document:', error);
        this.app.toast('Error updating stock. Document may not exist.');
      });
    }
}}];
public bankInputs = [
 {
    placeholder: 'name',
 },
 {
  type: 'textarea',
  placeholder: 'number',
},
];

  ngOnInit() {
  }

}
