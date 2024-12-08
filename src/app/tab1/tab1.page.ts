import { Component } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    public app: AppService
  ) {}

  menu: any[] = [
    {label:'Makanan', icon: 'fast-food-outline', link: ['/category', 'makanan']},
    {label:'Pakaian', icon: 'shirt-outline', link: ['/category', 'pakaian']},
    {label:'Elektronik', icon: 'desktop-outline', link: ['/category', 'elektronik']},
    {label:'Peralatan', icon: 'diamond-outline', link:['/category', 'peralatan']},
  ]

  product: any = [
    // {label:'Pizza',price:'Rp 20.000',des:" Here's a small text description ", image: 'file-tray-stacked', link: '/detail-product'},
    // {label:'Pizza',price:'Rp 20.000',des:" Here's a small text description ", image: 'file-tray-stacked', link: '/detail-product'},
    // {label:'Pizza',price:'Rp 20.000',des:" Here's a small text description ", image: 'file-tray-stacked', link: '/detail-product'},
    // {label:'Pizza',price:'Rp 20.000',des:" Here's a small text description ", image: 'file-tray-stacked', link: '/detail-product'},
    // {label:'Pizza',price:'Rp 20.000',des:" Here's a small text description ", image: 'file-tray-stacked', link: '/detail-product'}
  ]

  ionViewDidEnter(){
    this.app.collection('product').subscribe(res => {
      this.product = res;
    })
  }


}
