import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  category: string | null = null; 
  product: any = [];
  constructor(
    public app: AppService,
    public route: ActivatedRoute,
    public router: Router,
  ) { }

  ionViewDidEnter(){
    this.category = this.route.snapshot.paramMap.get('category');
    if(this.category){
      this.app.getRecordsByField('product', 'category', this.category,'==')
    .subscribe(records => {
      this.product = records;
    });

    }
    
  }

  ngOnInit() {
  }

}
