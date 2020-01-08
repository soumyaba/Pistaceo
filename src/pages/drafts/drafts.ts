import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { WorkService } from '../../services/work.service';
import { UserService } from '../../services/user.service';
import { ActivityPage } from '../activity/activity';
import { LoadingService } from '../../services/loading-service';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the DraftsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-drafts',
  templateUrl: 'drafts.html',
})
export class DraftsPage implements OnInit{
public animateClass:any;
public draftItems: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public ws:WorkService, public us:UserService, private menuCtrl:MenuController,
    private loading: LoadingService, private translate: TranslateService, public events: Events) {
    this.animateClass = { 'fade-in-left-item': true };
    this.menuCtrl.enable(true, 'myMenu');
  }

  ionViewDidLoad() {
  }
  ngOnInit() {
    // this.loading.show();
    // this.ws.getDraftItems(this.us.getCurrentUser().EmpNo, 1)
    // .subscribe(data => {this.getDraftItems(data); this.loading.hide();}, error => { this.loading.hide();});
  }
  ionViewWillEnter() {
    this.loading.show();
    this.ws.getDraftItems(this.us.getCurrentUser().EmpNo, 1)
    .subscribe(data => {this.getDraftItems(data); this.loading.hide();}, error => { this.loading.hide();});
  }
  getDraftItems(data) {
    let value = JSON.parse(data._body);
    this.draftItems = value.activities;
    let draftsCount = {
      drafts: data
    };
    this.events.publish('draftsCounts', draftsCount);
  }
  itemClick(item) {
    this.navCtrl.push(ActivityPage, {
      firstParameter: item.id,
      readWrite: 'readWrite',
      taskfrom: 'Drafts'
    });
  }
  doRefresh(event) {
    // this.loading.show();
     this.ws.getDraftItems(this.us.getCurrentUser().EmpNo, 1).subscribe(data => {this.getDraftItems(data); event.complete();}, error => {event.complete();});
  }
}
