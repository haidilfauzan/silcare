import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-my-product',
  templateUrl: './my-product.page.html',
  styleUrls: ['./my-product.page.scss'],
})


// Filter produk berdasarkan nilai 'user'
//const filteredProducts = products.filter(product => product.user === user_id);
export class MyProductPage implements OnInit {

  constructor(
    public app: AppService
  ) { }

  product:any = [
    // Data produk seperti yang Anda tunjukkan sebelumnya
  ];


  ionViewDidEnter(){
    this.app.collection('product').subscribe((records: any[]) => {
      this.product = records.filter(record => record.user === this.app.userlogin.id);
    })
  }

  triggerEvent(event: any) {
    console.log('event trigger',event.detail.value);
    if (event.detail.value == 'semua') {
      this.app.collection('product').subscribe((records: any[]) => {
        this.product = records.filter(record => record.user === this.app.userlogin.id);
      })
    }else{
    this.app.getRecordsByField('product', 'category', event.detail.value,'==')
    .subscribe((records: any[]) => {
      this.product = records.filter(record => record.user === this.app.userlogin.id);
    });}
}


  ngOnInit() {
  }

}
