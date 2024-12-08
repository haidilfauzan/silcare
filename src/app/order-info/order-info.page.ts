import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.page.html',
  styleUrls: ['./order-info.page.scss'],
})
export class OrderInfoPage implements OnInit {
  id: string | null = null;
  proses_product:any =[];
  addressfrom:any = [];
  addressto:any = [];
  courier:string | null = null;
  total:number = 0;
  ispacking: boolean = false;
  isfind: boolean = false;
  isaccept: boolean = false;
  issend: boolean = false;
  isdone: boolean = false;
  salah: boolean = false;
  status:string = 'ordered';
  umkm:any = [];
  userumkm:any = [];
  constructor(
    public app: AppService,
    public route: ActivatedRoute,
    public router: Router
  ) {
   }

  ionViewDidEnter(){
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.app.doc('checkout', this.id).subscribe((res:any) => {
        this.proses_product = res;
        console.log(this.proses_product);
    // if(this.proses_product.status == 'ordered'){
    //   this.ispacking = true;
    // }
    if (this.proses_product.status == 'packing'){
      this.ispacking = true;
      console.log(this.proses_product.status)
    } 
    if (this.proses_product.status == 'finding_courier'){
      this.ispacking = true;
      this.isfind = true;
    }
    if (this.proses_product.status == 'courier_taking'){
      this.ispacking = true;
      this.isfind = true;
      this.isaccept = true;

    }
    if (this.proses_product.status == 'done') {
      this.ispacking = true;
      this.isfind = true;
      this.isaccept = true;
      this.issend = true;

    }
        this.addressto = res.buyer.address;

        this.app.doc('user', res.user).subscribe((res:any) => {
          this.userumkm = res;
          this.addressfrom = res.address
        })
      })
    }
  }

  // confirm(){
  //   this.id = this.route.snapshot.paramMap.get('id');
  //   if(this.id){
  //     this.app.doc('checkout', this.id).subscribe((res:any) => {
  //       res.status = 'packing';
    
  //     console.log(res);
  //     this.proses_product = res;
  //     })
  //     console.log(this.id,this.proses_product);
  //     this.app.update('checkout',this.id,this.proses_product).then(()=>{
  //       this.app.toast('update')
  //     })
      
      
  //   }
      
  // }

  confirm() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.proses_product['status'] = 'packing';
    this.ispacking = true;
    if(this.id){
      this.app.update('checkout',this.id,this.proses_product).then((res:any)=>{
        this.app.toast('pesanan dikonfirmasi')
      })
    }
   
  }
  findcourier() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.proses_product['status'] = 'finding_courier';
    if(this.id){
      this.app.update('checkout',this.id,this.proses_product).then((res:any)=>{
        this.app.toast('mencari kurir')
        this.ispacking = true;
      this.isfind = true;
      })
    }
   
  }
  courier_taking() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.proses_product['status'] = 'courier_taking';
    if(this.id){
      this.app.update('checkout',this.id,this.proses_product).then((res:any)=>{
        this.app.toast('kurir mengambil pesanan')
        this.ispacking = true;
      this.isfind = true;
      this.isaccept = true;
      })
    }
   
  }

  courier_giving() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.proses_product['status'] = 'done';
    if(this.id){
      this.app.update('checkout',this.id,this.proses_product).then((res:any)=>{
        this.ispacking = true;
        this.isfind = true;
        this.isaccept = true;
        this.issend = true;
        this.app.toast('diterima')
      })
    }
   
  }
  berinilai(){
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.router.navigate(['add-review',this.id])
    }
    
  }

  ngOnInit() {
  }

}
