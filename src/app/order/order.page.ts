import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { addIcons } from 'ionicons';
import { chevronForward, listCircle } from 'ionicons/icons';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  result:any = {};
  product: any = [];
  order:any = {};
  constructor(
    public app: AppService
  ) { 
    addIcons({ chevronForward, listCircle });
  }

  async ionViewDidEnter(){
    const session = await this.app.getSession();
   this.app.getRecordsByField('checkout', 'status', ['ordered','packing','finding_courier','courier_taking','done'],"in").subscribe(res => {
    console.log(res)
    if(this.app.userlogin.role == 'admin'){
      this.product = res.filter((item:any) => item.user == session.userId);
    }  
    if(this.app.userlogin.role == 'user'){
      this.product = res.filter((item:any) => item.buyer.email == this.app.userlogin.email);
    }
    if(this.app.userlogin.role == 'courier'){
      this.product = res.filter((item:any) => item.status == 'courier_taking');
    }  
   
     
    })

    // this.app.getRecordsByField('checkout', 'status', ['ordered','finding_courier','courier_taking'],"in")
    //   .subscribe(records => {
    //     this.product = records;
    //   });
  
  }

  // showumkm(uid:string){
  //   let umkm:any;
  //   this.app.doc('umkm', uid).subscribe(res => {
  //     umkm = res;
     
  //   })
  //   return umkm.name
  // }

  courier(productid:string){
    this.app.doc('checkout', productid).subscribe(res => {
      this.order = res;
      console.log(this.order)
      this.order.status = 'finding_courier';
      console.log(this.order)
      this.app.update('checkout',productid,this.order).then(()=>{
        this.app.toast('finding Courier')
      })
    })
  }
  ngOnInit() {
  }

}
