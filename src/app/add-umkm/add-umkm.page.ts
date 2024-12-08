import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-umkm',
  templateUrl: './add-umkm.page.html',
  styleUrls: ['./add-umkm.page.scss'],
})
export class AddUmkmPage implements OnInit {
  selectedImage: any = null;
  downloadURL: string | null = null;
  constructor(
    public router: Router,
    public app: AppService,
    private storage: AngularFireStorage
  ) { }

  ngOnInit() {
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const filePath = `logo/${new Date().getTime()}_${file.name}`;
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

  umkm: any = {};

  simpan() {
    if(this.downloadURL){
      this.umkm['photo'] = this.downloadURL}
      this.umkm['email'] = this.app.userlogin.email
    this.app.add('umkm', this.umkm).then(umkmCredential => {
      if (umkmCredential && umkmCredential.id) {
        console.log(umkmCredential.id);
        this.app.getRecordsByField('user', 'email', this.app.userlogin.email,'==').subscribe(records => {
          console.log(this.app.userlogin);
        this.app.userlogin = records[0];
        console.log(this.app.userlogin);
        this.app.userlogin['umkm'] = umkmCredential.id;
        this.app.update('user',this.app.userlogin.id,this.app.userlogin).then(()=>{
          this.app.toast('taken');
          this.router.navigate(['tabs']);
        })
      });
        
      }
        
    })}

   
  }

