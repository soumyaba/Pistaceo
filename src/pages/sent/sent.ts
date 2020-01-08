import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { WorkService } from '../../services/work.service';
import { LoadingService } from '../../services/loading-service';
import { ActivityPage } from '../activity/activity';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the SentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sent',
  templateUrl: 'sent.html',
})
export class SentPage implements OnInit {
  public sentItems: any;
  animateClass: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController,
    private us: UserService, private ws: WorkService, private loading: LoadingService, private translate: TranslateService) {
    this.animateClass = { 'fade-in-left-item': true };
    this.menuCtrl.enable(true, 'myMenu');
  }

  ionViewDidLoad() {
    //   console.log('ionViewDidLoad SentPage');
  }
  ngOnInit() {
    this.loading.show();
    this.ws.getSentItems(this.us.getCurrentUser().EmpNo, 1)
      .subscribe(data => { this.getSentItems(data); this.loading.hide(); }, error => { this.loading.hide(); });
  }
  getSentItems(data) {
    let value = JSON.parse(data._body);
    this.sentItems = value.activities;

  }
  itemClick(item) {
    this.navCtrl.push(ActivityPage, {
      firstParameter: item.id,
      readWrite: 'readOnly',
      taskfrom: 'Sent'
    });
  }
  doRefresh(event) {
    // this.loading.show();
    this.ws.getSentItems(this.us.getCurrentUser().EmpNo, 1)
      .subscribe(data => { this.getSentItems(data); event.complete(); }, error => { event.complete(); });

  }
}
