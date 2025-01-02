import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  id: string | null = null; 
  product: any = [];
  shipping:number = 10000;
  userumkm:any = [];
  bank:any = [];
  addressfrom:any = [];
  addressto:any = [];
  selectedImage: any = null;
  downloadURL: string | null = null;
  constructor(
    public app: AppService,
    public route: ActivatedRoute,
    public router: Router,
    private storage: AngularFireStorage,
  ) { }

  getCoordinates(kecamatanName: string) {
    const coordinates = this.app.kecamatan[kecamatanName];
    console.log('TEST',kecamatanName);
    if (coordinates) {
      console.log(`Latitude: ${coordinates.lat}, Longitude: ${coordinates.lon}`);
      return coordinates; // Mengembalikan objek koordinat
    } else {
      console.error('Kecamatan tidak ditemukan');
      return null;
    }
  }


  ionViewDidEnter(){
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.app.doc('checkout', this.id).subscribe(res => {
        this.product = res;
        this.product.qty = 1;
        this.addressto = this.app.userlogin.address;
        this.app.doc('user', this.product.user).subscribe(res =>{
          this.userumkm = res;
          this.addressfrom = this.userumkm.address;
          this.app.doc('bank', this.userumkm.bank).subscribe(res =>{
            this.bank = res;
          })
          this.shipping = this.app.distance(
            this.getCoordinates(this.addressfrom.kecamatan).lat,
            this.getCoordinates(this.addressfrom.kecamatan).lon,
            this.getCoordinates(this.addressto.kecamatan).lat,
              this.getCoordinates(this.addressto.kecamatan).lon)

          this.shipping = Math.round(this.shipping) * 3000
              console.log(this.shipping);
            
            }
          )
        })

    }
    
  }

  // async copyText() {
  //   await this.clipboard.copy(this.bank.number);
  //   this.presentToast('Text copied to clipboard!');
  // }

  // async presentToast(message: string) {
  //   const toast = await this.toastController.create({
  //     message,
  //     duration: 2000,
  //   });
  //   toast.present();
  // }

  checkout(){
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.product['status'] = 'ordered';
      this.product['shipping'] = this.shipping;
      if (this.product['payment'] == 'Transfer'){
        this.product['payment_photo'] = this.downloadURL}
    this.app.update('checkout',this.id,this.product).then(()=>{
      this.app.toast('ordered')
      this.router.navigate(['tabs','tab2']);
    })

    }
    
  }

  public alertButtons = [{text:'OK',handler: (data:any) => {
   }}];
  public alertInputs = [
    {
      type: 'textarea',
      placeholder: 'alamat lengkap',
    },
  ];

  triggerEvent(event: CustomEvent): void {
    // Extract value from event
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;

    // Convert value to number
    const numericValue = Number(inputValue);

    // Check if conversion was successful and use numericValue
    if (!isNaN(numericValue)) {
      console.log('Input value as number:', numericValue);
      this.product.qty = numericValue
      // Proceed with the numericValue
    } else {
      console.error('Input value is not a valid number.');
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const filePath = `payment/${new Date().getTime()}_${file.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);

      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.downloadURL = url;
            console.log('File available at', this.downloadURL);
          });
        })
      ).subscribe();
    }}




  ngOnInit() {
  }

}
