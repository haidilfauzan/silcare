import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Plugin } from '@ionic-native/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AlertController, Platform } from '@ionic/angular';

interface AppUpdate {
  current: string;
  enabled: boolean,
  msg?:{
    title:string,
    msg : string,
    btn  : string
  }
  majorMsg?:{
    title:string,
    msg : string,
    btn  : string
  }
  minorMsg?:{
    title:string,
    msg : string,
    btn  : string
  }
}
@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  updateExample = 'https://raw.githubusercontent.com/haidilfauzan/silcare/master/version.json'
  maintenanceExample = 'https://raw.githubusercontent.com/haidilfauzan/silcare/master/maintenance.json'
  constructor(
    private http: HttpClient,
    private alertCtrl: AlertController,
    private appVersion: AppVersion,
    private iab: InAppBrowser,
    private plt: Platform
  ) { }

  async checkForUpdate(){
    this.http.get<AppUpdate>(this.updateExample).subscribe(async (info) =>{
      console.log('result',info);
      if (!info.enabled){
        this.presentAlert(info.msg?.title, info.msg?.msg,);
      } else  {
        const versionNumber = await this.appVersion.getVersionNumber();
        const splittedVersion = versionNumber.split('.');
        const serverVersion = info.current.split('.');
        console.log(serverVersion)
        if (serverVersion[0] > splittedVersion[0]){
          this.presentAlert(info.majorMsg?.title, info.majorMsg?.msg,info.majorMsg?.btn);

        } else if (serverVersion[1] > splittedVersion[1]){
          this.presentAlert(info.minorMsg?.title, info.minorMsg?.msg,info.minorMsg?.btn,true);

        } 
      }
    })

  }

  openAppstoreEntry(){
    console.log('Redirecting to Silcare Website...');
  const browser = this.iab.create('https://silcare.co.id', '_blank', {
    location: 'yes',  // Shows the browser location bar
    clearcache: 'yes', // Clears cache
    clearsessioncache: 'yes', // Clears session cache
    toolbar: 'yes' // Shows toolbar in the browser
  });
  browser.show();

  }

  async presentAlert(header:any ,message:any , buttonText = '', allowClose = false){
    const buttons:any = [];

    if (buttonText != "") {
      buttons.push({
        text: buttonText, // Use the variable `buttonText` (no quotes)
        handler: () => {
          this.openAppstoreEntry(); // Removed the trailing comma
        },
      });
    }
    if (allowClose){
      buttons.push({
        text: 'Close',
        role: 'cancel'
      })
    }
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons,
      backdropDismiss: allowClose
    });
    await alert.present();
  }
}
