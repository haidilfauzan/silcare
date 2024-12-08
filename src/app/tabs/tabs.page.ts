import { Component } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  constructor(
    public app: AppService,
  ) {

  }
 
}
