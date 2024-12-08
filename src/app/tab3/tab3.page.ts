import { Component } from '@angular/core';
import { AppService } from '../services/app.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  umkm:any = {};
  bank:any = {};
  constructor(
    public app: AppService,
  ) {
  }

  ionViewDidEnter(){
    this.bank['id'] = this.app.userlogin.bank;
    this.umkm['id'] = this.app.userlogin.umkm;
    if(this.umkm['id']){
      this.app.doc('umkm', this.umkm['id']).subscribe(res => {
        this.umkm = res;
      })

    }
    if(this.bank['id']){
      this.app.doc('bank', this.bank['id']).subscribe(res => {
        this.bank = res;
      })

    }
    
  }


  menu: any[] = [
    {label:'Produk', icon: 'bag-add-outline', link: '/my-product'},
    {label:'Pesanan', icon: 'bag-check-outline', link: '/order'},
    {label:'Customer', icon: 'accessibility', link: '/customer'},
    {label:'Setting', icon: 'build-outline', link: '/kategori'}
  ]

  // product: any = [
  //   {label:'Pizza',price:'Rp 20.000',des:" Here's a small text description ", image: 'file-tray-stacked', link: '/kategori'},
  //   {label:'Pizza',price:'Rp 20.000',des:" Here's a small text description ", image: 'file-tray-stacked', link: '/kategori'},
  //   {label:'Pizza',price:'Rp 20.000',des:" Here's a small text description ", image: 'file-tray-stacked', link: '/kategori'},
  //   {label:'Pizza',price:'Rp 20.000',des:" Here's a small text description ", image: 'file-tray-stacked', link: '/kategori'},
  //   {label:'Pizza',price:'Rp 20.000',des:" Here's a small text description ", image: 'file-tray-stacked', link: '/kategori'}
  // ]

}
