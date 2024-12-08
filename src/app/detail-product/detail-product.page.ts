import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { bookmark, bookmarkOutline } from 'ionicons/icons';


@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.page.html',
  styleUrls: ['./detail-product.page.scss'],
})
export class DetailProductPage implements OnInit {

  constructor(
    public app: AppService,
    public route: ActivatedRoute,
    public router: Router,
  ) {  addIcons({ bookmark, bookmarkOutline });}

  id: string | null = null; 
  product: any = [];
  umkm: any = [];
  address: any = [];
  reviews: any = [];
  segment_value = 'description';
  bookmark = false;
  
  

  toggleBookmark() {
    // console.log(this.cart.qty)
    // this.cart.product = this.route.snapshot.paramMap.get('id');
    // this.cart.name = this.product['name']
    // this.cart.price = this.product['price']
    // this.cart.photo = this.product['photo']
    // if(this.bookmark){
    //   this.app.add('cart', this.cart).then(() => {
    //     this.app.toast('product is added');
        
    //   })
    // } 
    // this.bookmark = !this.bookmark;
  }
  public alertButtons = [ {
    text: 'Cancel',
    role: 'cancel',
    handler: () => {
      console.log('Alert canceled');
    },
  },{text:'OK',handler: (data:any) => {
    this.product.stock = data[0];
    this.product.description  = data[1];
    console.log(data[0],this.product.stock)
    this.id = this.route.snapshot.paramMap.get('id')
    if (this.id){
    this.app.update('product',this.id,this.product).then(()=>{
      this.app.toast('stock update')
    }).catch(error => {
      console.error('Error updating document:', error);
      this.app.toast('Error updating stock. Document may not exist.');
    });
  }
  }}];
 public alertInputs = [
   {
    type: 'number',
      placeholder: 'Stock',
      min: 1,
      max: 100,
   },
   {
    type: 'textarea',
    placeholder: 'description',
  },
 ];

  ionViewDidEnter(){
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.app.doc('product', this.id).subscribe((res:any) => {
        this.product = res;
        console.log(this.product, res.id)
        this.app.getRecordsByField('reviews', 'product',this.id,'==').subscribe(records => { 
          console.log(records)
          this.reviews= records;
        console.log(this.reviews)})
        this.app.doc('umkm',this.product.umkm).subscribe(res => {
          this.umkm= res;})
          console.log(this.umkm)
          this.app.doc('user',this.product.user).subscribe((res:any) => {
            this.address = res.address;})
      })

    }
    
  }

  hapus(){
    this.id = this.route.snapshot.paramMap.get('id');
    this.app.getRecordsByField('checkout','product',this.id, '==').subscribe(
      (res:any) => {
        console.log(res)
        if(res == null){
          this.app.toast('Produk ini tidak dapat di hapus');
        }else{
          if(this.id){
            this.router.navigate(['my-product']);
            this.app.delete('product',this.id).then((res:any) =>{
              this.app.toast(res.name + 'Produk ini di hapus');
             
              
            })
          }
          
        }
      }
    )
   

  }

  checkout(){
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.product)
    
    this.product['buyer'] = this.app.userlogin
    this.product['product'] = this.id
    this.app.add('checkout', this.product).then((result) => {
      // this.app.toast('product is added');
      // this.cart = {};
      // this.checkouts = result
      console.log(this.product,result.id)
      this.router.navigate(['checkout',result.id]);
    })
    // this.cart.product = this.route.snapshot.paramMap.get('id');
    // this.cart.price = this.product['price']
    

    // if(this.product['photo']){
    //   this.cart.photo = this.product['photo']}
    //   this.app.add('checkout', this.cart).then((result) => {
    //   this.app.toast('product is added');
    //   this.cart = {};
    //   this.checkouts = result
    //   console.log(this.checkouts)
    //   this.router.navigate(['checkout',this.checkouts.id]);
    // })
    
    
  }
  ngOnInit() {
  }

}
