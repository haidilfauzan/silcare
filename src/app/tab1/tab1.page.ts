import { Component } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  searchTerm: string = '';  // To store the search term
  product: any[] = [];      // Original list of products
  filteredProducts: any[] = [];  // Filtered products based on search term

  constructor(
    public app: AppService
  ) {}

  // Menu categories
  menu: any[] = [
    {label: 'Makanan', icon: 'fast-food-outline', link: ['/category', 'makanan']},
    {label: 'Pakaian', icon: 'shirt-outline', link: ['/category', 'pakaian']},
    {label: 'Elektronik', icon: 'desktop-outline', link: ['/category', 'elektronik']},
    {label: 'Peralatan', icon: 'diamond-outline', link: ['/category', 'peralatan']},
  ];

  // Fetch the products
  ionViewDidEnter() {
    this.app.collection('product').subscribe(res => {
      this.product = res;
      this.filteredProducts = res; // Initially, display all products
    });
  }

  // Filter products based on search term
  filterProducts() {
    if (this.searchTerm.trim() === '') {
      this.filteredProducts = this.product;  // Show all products if search is empty
    } else {
      this.filteredProducts = this.product.filter(item => 
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );  // Filter products based on product name
    }
  }
}