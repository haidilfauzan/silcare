import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.page.html',
  styleUrls: ['./add-review.page.scss'],
})
export class AddReviewPage implements OnInit {
  review:any = {};
  id:string | null = null;
  // satu:boolean = false;
  // dua:boolean = false;
  // tiga:boolean = false;
  // empat:boolean = false;
  // lima:boolean = false;

  constructor(  public route: ActivatedRoute,
    public app: AppService,
    public router: Router,
  ) { }

  simpan() {
    this.id = this.route.snapshot.paramMap.get('id');
    
    
    if(this.id){
      this.app.doc('checkout', this.id).subscribe((res:any) => {
        this.review['product'] = res.product;
        this.review['user'] = this.app.userlogin;
        console.log(this.review)
        this.app.add('reviews', this.review).then(()=>{
        this.app.toast('reviews is added');
        this.router.navigate(['tabs']);
        })
       ;}
      )
    }
        
   
    
    
  }

  ngOnInit() {
  }

}
