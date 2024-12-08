import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-courier',
  templateUrl: './courier.page.html',
  styleUrls: ['./courier.page.scss'],
})
export class CourierPage implements OnInit {
  product: any = [];
  order:any = {};
  constructor(
    public app: AppService
  ) { }

  ionViewDidEnter(){
    // this.app.collection('product').subscribe(res => {
    //   this.product = res;
    // })
    this.app.getRecordsByField('checkout', 'status', 'finding_courier','==')
      .subscribe(records => {
        this.product = records;
      });
  }

  ambil(productid:string){
    this.app.doc('checkout', productid).subscribe(res => {
      this.order = res;
      console.log(this.order)
      this.order.status = 'courier_taking';
      this.order.courier = this.app.userlogin;
      console.log(this.order)
      this.app.update('checkout',productid,this.order).then(()=>{
        this.app.toast('taken')
      })
    })
  }

  ngOnInit() {
  }

}
