import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { getAuth, sendEmailVerification } from "firebase/auth";
import { Capacitor } from '@capacitor/core';
import { ActionPerformed, PushNotificationSchema, PushNotifications, Token } from '@capacitor/push-notifications';
import { take } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { Observable, BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import {StorageService} from "../services/storage.service";
import { refresh } from 'ionicons/icons';
import { catchError } from 'rxjs/operators';


export const FCM_TOKEN = 'push_notification_token';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  userlogin: any = {};
  userId: string | null = null;
  kecamatan:any = {
    "Batam Kota": {
        lat: 1.0833,
        lon: 104.0667
    },
    "Batu Ampar": {
        lat: 1.0833,
        lon: 104.1333
    },
    "Belakang Padang": {
        lat: 1.0333,
        lon: 104.1167
    },
    "Bintan Utara": {
        lat: 1.2000,
        lon: 104.6333
    },
    "Bintan Selatan": {
        lat: 1.1833,
        lon: 104.5500
    },
    "Bulang": {
        lat: 1.1167,
        lon: 104.2167
    },
    "Galang": {
        lat: 1.0833,
        lon: 104.1167
    },
    "Lubuk Baja": {
        lat: 1.0833,
        lon: 104.0833
    },
    "Sei Beduk": {
        lat: 1.0833,
        lon: 104.2000
    },
    "Sei Ladi": {
        lat: 1.0833,
        lon: 104.2667
    },
    "Sungai Panas": {
        lat: 1.0667,
        lon: 104.2000
    },
    "Tanjung Pinggir": {
        lat: 1.1167,
        lon: 104.1667
    },
    "Tanjung Riau": {
        lat: 1.0833,
        lon: 104.1000
    }
};

private _redirect = new BehaviorSubject<any>(null);

get redirect() {
  return this._redirect.asObservable();
}
  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private toastController: ToastController,
    private storage: Storage,
    private storageSer: StorageService,
    
    
  ) {
    this.init();
   }


    // Change the authenticated user's email address
    async changeEmail(newEmail: string): Promise<void> {
      try {
        const user = await this.auth.currentUser;
    
        if (!user) {
          throw new Error('No user is currently signed in.');
        }
    
        // Update the email address
        await user.updateEmail(newEmail);
    
        // Send verification email
        await sendEmailVerification(user);
    
        // Display a toast message with a clear instruction to verify the email
        const toast = await this.toastController.create({
          message: 'Email updated successfully. Please check your inbox and verify the new email address.',
          duration: 3000,
          color: 'success'
        });
        await toast.present();
    
        // Optionally, you can redirect the user to a verification page or display a modal to guide them through the verification process.
    
      } catch (error: any) {
        // Handle specific error cases
        if (error.code === 'auth/invalid-email') {
          // Display a toast message indicating an invalid email format
          const toast = await this.toastController.create({
            message: 'Invalid email address. Please enter a valid email.',
            duration: 3000,
            color: 'warning'
          });
          await toast.present();
        } else {
          // Handle other errors
          const toast = await this.toastController.create({
            message: 'Error changing email: ' + error.message,
            duration: 3000,
            color: 'danger'
          });
          await toast.present();
          console.error('Error changing email:', error);
        }
      }
    }



   initPush() {
    if(Capacitor.getPlatform() !== 'web') {
      this.registerPush();
      // this.getDeliveredNotifications();
    }
  }

  private async registerPush() {
    try {
      await this.addListeners();
      let permStatus = await PushNotifications.checkPermissions();

      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
      }

      if (permStatus.receive !== 'granted') {
        throw new Error('User denied permissions!');
      }

      await PushNotifications.register();
    } catch(e) {
      console.log(e);
    }
  }

  async getDeliveredNotifications() {
    const notificationList = await PushNotifications.getDeliveredNotifications();
    console.log('delivered notifications', notificationList);
  }

  addListeners() {
    PushNotifications.addListener(
      'registration',
      async(token: Token) => {
        console.log('My token: ', token);
        const fcm_token = (token?.value);
        let go = 1;
        const saved_token = JSON.parse((await this.storageSer.getStorage(FCM_TOKEN)).value);
        if(saved_token) {
          if(fcm_token == saved_token) {
            console.log('same token');
            go = 0;
          } else {
            go = 2;
          }
        }
        if(go == 1) {
          // save token
          this.storageSer.setStorage(FCM_TOKEN, JSON.stringify(fcm_token));
        } else if(go == 2) {
          // update token
          const data = {
            expired_token: saved_token,
            refreshed_token: fcm_token
          };
          this.storageSer.setStorage(FCM_TOKEN, fcm_token);
        }
      }
    );

    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification: PushNotificationSchema) => {
        console.log('Push received: ' + JSON.stringify(notification));
        const data = notification?.data;
        if(data?.redirect) this._redirect.next(data?.redirect);
      }
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      async (notification:ActionPerformed) => {
        const data = notification.notification.data;
        console.log('Action performed: ' + JSON.stringify(notification.notification));
        console.log('push data: ', data);
        if(data?.redirect) this._redirect.next(data?.redirect);
      }
    );
  }

  async removeFcmToken() {
    try {
      const saved_token = JSON.parse((await this.storageSer.getStorage(FCM_TOKEN)).value);
      this.storageSer.removeStorage(saved_token);
    } catch(e) {
      console.log(e);
      throw(e);
    }

  }

   async init() {
    await this.storage.create();
    this.userId = (await this.getSession()).userId;
    if ( this.userId){
       this.user(this.userId).subscribe(user =>{
        this.userlogin = user;
       })
    }

    console.log(this.userId)
  }

  async setSession(userId: string, token: string) {
    await this.storage.set('userId', userId);
    await this.storage.set('token', token);
  }

  async getSession() {
    const userId = await this.storage.get('userId');
    const token = await this.storage.get('token');
    return { userId, token };
  }

  async clearSession() {
    await this.storage.remove('userId');
    await this.storage.remove('token');
  }

  async toast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      position: 'top',
      duration: 3000,
      buttons: [
        {icon: 'close', side:'end'}
      ]
    })

    await toast.present();
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  createuser(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email,password)
    
  }
  logout(){
    this.auth.signOut().then(() => {
      this.router.navigate(['login']);
    })
  }

  user(uid: string){
    return this.firestore.collection('user').doc(uid).valueChanges().pipe(take(1));
  }


  collection(collection: string){
    return this.firestore.collection(collection).valueChanges({idField:"id"}).pipe(take(1));
  }

  doc(collection: string, doc: string){
    return this.firestore.collection(collection).doc(doc).valueChanges().pipe(take(1));

  }
  add(collection: string, data:any){
    return this.firestore.collection(collection).add(data);
  }

  update(collection: string, doc: string, data: any) {
    return this.firestore.collection(collection).doc(doc).update(data);
  }

  delete(collection: string, doc:string){
    return this.firestore.collection(collection).doc(doc).delete();
  }

  getRecordsByField(collection: string, field: string, value: any,  operator: '==' | '>' | '<' | '>=' | '<=' | 'array-contains' | 'in' | 'not-in' ) {
    return this.firestore.collection(collection, ref => ref.where(field, operator, value)).valueChanges({idField: "id"}).pipe(take(1));
  }

  createDocumentWithId(collection: string, docId: string, data: any) {
    return this.firestore.collection(collection).doc(docId).set(data);
  }

  toRad(deg:number) {
    return deg * (Math.PI / 180);
}

distance(lat1:number, lon1:number, lat2:number, lon2:number) {
  const R = 6371; // Radius of Earth in kilometers
  const dLat = this.toRad(lat2 - lat1);
  const dLon = this.toRad(lon2 - lon1);
  const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

forgetPassword(email:string){
  this.auth.sendPasswordResetEmail(email).then(()=>{
    alert('email reset password telah dikirim')
    this.router.navigate(['/login']);
  },err =>{
    alert('something when wrong')
  }

  )
}

sendEmailForVarifiction(user: any){
  user.sendEmailVerification().then(()=>{
    this.router.navigate(['/varify-email']);
  }, (err:any) =>{
    alert('Something went wrong')
  })
}

cleanErrorMessage(errorMessage: string): string {
  // Menggunakan regex untuk menghapus bagian yang di dalam tanda kurung
  return errorMessage
  .replace(/\s*\(.*?\)\s*/g, '') // Remove text in parentheses
  .replace(/Firebase:\s*/gi, '')  // Remove the word 'Firebase'
  .trim(); // Trim whitespace
}



ngOnInit() {
  console.log('Initializing HomePage');

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then((result) => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration', (token: Token) => {
      alert('Push registration success, token: ' + token.value);
    });

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
      alert('Push received: ' + JSON.stringify(notification));
    });

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
      alert('Push action performed: ' + JSON.stringify(notification));
    });
  

}

}
