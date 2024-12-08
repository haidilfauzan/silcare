import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-myproduct',
  templateUrl: './add-myproduct.page.html',
  styleUrls: ['./add-myproduct.page.scss'],
})
export class AddMyproductPage implements OnInit {
  selectedImage: any = null;
  downloadURL: string | null = null;
  umkm: any = null;
  constructor(
    public app: AppService,
    private storage: AngularFireStorage,
    public router: Router
  ) { }

  // umkmname(){
  //   this.app.doc('umkm', this.app.userlogin.umkm).subscribe(res => {
  //     this.umkm = res
  //     console.log(this.umkm)
  //   })
  //   return this.umkm
  // }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const filePath = `images/${new Date().getTime()}_${file.name}`;
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

  myproduct: any = {};

  simpan() {
    if(this.downloadURL){
      this.myproduct['photo'] = this.downloadURL;
      this.myproduct['user'] = this.app.userlogin.id;
      this.myproduct['umkm'] = this.app.userlogin.umkm}
    console.log(this.myproduct)
    this.app.add('product', this.myproduct).then(() => {
      this.app.toast('product is added');
      this.router.navigate(['my-product']);
      this.myproduct = {};
    })
  }
  

  ngOnInit() {
  }

}
