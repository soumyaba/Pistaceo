import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { WorkService } from '../../services/work.service';
import { UserService } from '../../services/user.service';
import { ActivityPage } from '../activity/activity';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the ArchivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-archive',
  templateUrl: 'archive.html',
})
export class ArchivePage implements OnInit{
public archiveList = [];
public animateClass;
  constructor(public navCtrl: NavController, public navParams: NavParams, private ws: WorkService,
    private us: UserService, private menuCtrl: MenuController, private translate: TranslateService ) {
    this.animateClass = { 'fade-in-left-item': true };
    this.menuCtrl.enable(true, 'myMenu');
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ArchivePage');
  }
  ngOnInit() {
    this.ws.getArchiveItems(this.us.getCurrentUser().EmpNo, 1).subscribe(data => this.getArchibveResult(data));
  }
  getArchibveResult(data) {
    let value = JSON.parse(data._body);
    this.archiveList = value.activities;
  }
  doRefresh(event) {
    this.ws.getArchiveItems(this.us.getCurrentUser().EmpNo, 1).subscribe(data => {this.getArchibveResult(data); event.complete();}, error => {event.complete();});
  }
  itemClick(items) {
this.navCtrl.push(ActivityPage, {
  firstParameter: items.id,
  readWrite: 'readOnly',
  taskfrom: 'Archive'
});
  }
}
