import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
})
export class CustomerPage implements OnInit {

  umkm_id:string = '';
  customer:any = [];

  constructor(
    public app: AppService,
  ) { }


  ionViewDidEnter() {
    this.umkm_id = this.app.userlogin.umkm;

    // Check if umkm_id is available
    if (this.umkm_id) {
      // Get records from 'checkout' collection where umkm field matches umkm_id
      this.app.getRecordsByField('checkout', 'umkm', this.umkm_id, '==')
        .subscribe((records: any[]) => {
          // Ensure records is an array and then map over the response
          if (records && Array.isArray(records)) {
            // Append each 'buyer' from the records to the customer array
            records.forEach(record => {
              if (record && record.buyer) {
                this.customer.push(record.buyer);
                console.log(record.buyer)
              }
            });
          }
        });
    }
  }

  ngOnInit() {
  }

}
