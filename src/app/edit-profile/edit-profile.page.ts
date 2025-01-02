import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  selectedImage: any = null;
  downloadURL: string | null = null;
  user: any = {};

  constructor(
    public router: Router,
    public app: AppService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {
    // Autofill user fields with data from app.userlogin
    this.user.name = this.app.userlogin.name;
    this.user.number = this.app.userlogin.phone;
    this.downloadURL = this.app.userlogin.photo || null; // Preload the user's current profile picture if it exists
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const filePath = `photo/${new Date().getTime()}_${file.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);

      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.downloadURL = url;
              console.log('File available at', this.downloadURL);
            });
          })
        )
        .subscribe();
    }
  }

  simpan() {
    if (this.downloadURL) {
      this.user['photo'] = this.downloadURL;
    }
    this.user['email'] = this.app.userlogin.email;

    // Update the user's information in the database
    this.app.update('user', this.app.userlogin.id, this.user).then(() => {
      // Update app.userlogin with new user information
      Object.assign(this.app.userlogin, this.user);
      this.app.toast('Profil berhasil diperbarui');
      this.router.navigate(['tabs']);
    }).catch((error) => {
      console.error('Error updating user profile:', error);
      this.app.toast('Gagal memperbarui profil');
    });
  }
}