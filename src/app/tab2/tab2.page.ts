import { Component } from '@angular/core';
import { AppService } from '../services/app.service';
import { addIcons } from 'ionicons';
import { chevronForward, listCircle } from 'ionicons/icons';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  proses:any = [];
  constructor(public app: AppService
  ) { 
    addIcons({ chevronForward, listCircle });
  }

  ionViewDidEnter(){
  this.app.getRecordsByField('checkout', 'status', ['ordered','finding_courier','courier_taking'],"in").subscribe((res:any[]) => {
    if(this.app.userlogin.role == "admin"){
      this.proses = res.filter(record => record.user === this.app.userlogin.id)
    } else {
      this.proses = res.filter(record => record.buyer.email === this.app.userlogin.email)
    }
  }
)
}
   
}

