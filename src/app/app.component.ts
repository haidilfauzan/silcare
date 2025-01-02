import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AppService } from './services/app.service';
import { UpdateService } from './services/update.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private updateService: UpdateService,
    private fcm: AppService
  ) {
    this.platform.ready().then(()=>{
      this.updateService.checkForUpdate();
      this.fcm.initPush();
    }).catch(e =>{
      console.log('error fcm: ',e);
    })
  }
}
