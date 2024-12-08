import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  constructor(
    public app: AppService
  ) { }

  product: any = []

  ionViewDidEnter(){
    this.app.collection('cart').subscribe(res => {
      this.product = res;
    })
  }

  ngOnInit() {
  }

}
