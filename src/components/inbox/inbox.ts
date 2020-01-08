import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, Content, MenuController, NavController, Nav, ActionSheetController, Events } from 'ionic-angular';
import { WorkService } from '../../services/work.service';
import { UserService } from '../../services/user.service';
import { HomePage } from '../../pages/home/home';
import { ToastService } from '../../services/toast-service';
import { LoadingService } from '../../services/loading-service';
import { ActivityPage } from '../../pages/activity/activity';
import { SchemaService } from '../../services/schema.service';
import { TranslateService } from '@ngx-translate/core';
import { MenuService } from '../../services/menu-service';
import { ConfigurationService } from '../../services/configuration.service';

/**
 * Generated class for the InboxComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@IonicPage()
@Component({
  selector: 'inbox',
  templateUrl: 'inbox.html'
})
export class InboxComponent implements OnInit {
  @ViewChild(Content)
  content: Content;
  animateItems = [];
  animateClass: any;
  active: boolean;
  public actions: any;
  public swipefunctions: any;
  public itemId: any;
  public itemTypeId: any;
  public userName;

  constructor(private ws: WorkService, private us: UserService, private menuCtrl: MenuController,
    private navCtrl: NavController, private toaster: ToastService, private loading: LoadingService,
    private actionSheetCtrl: ActionSheetController, private ss: SchemaService,
    private translate: TranslateService, public events: Events, private cfs: ConfigurationService) {
    this.animateClass = { 'fade-in-left-item': true };
    this.menuCtrl.enable(true, 'myMenu');
    // this.ws.getActivityResponses(id).subscribe(data => {this.temparray(data, id, typeid)});
  }
  ngOnInit() {
    //   this.loading.show();
    // this.ws.getInboxItems(this.us.getCurrentUser().EmpNo, 1).subscribe(data => {this.getInboxResult(data); this.loading.hide();}, error => {this.loading.hide();});
  }
  getInboxResult(data) {
    let value = JSON.parse(data._body);
    this.animateItems = value.activities;
    let inboxCount = {
      inbox: data
    }
    this.events.publish('inboxCounts', inboxCount);
  }
  itemClick(item) {
    if (item.status === 'NEW') {
      this.ws.markActivityAsRead(this.us.getCurrentUser().EmpNo, item.id, this.us.getCurrentUser().roles['0'].id).subscribe(data => data);
    }
    this.navCtrl.push(ActivityPage, {
      firstParameter: item.id,
      readWrite: 'readWrite',
      taskfrom: 'Inbox'
    });
  }

  favorite(onFavorite, item, event) {

  }
  goBack() {
    this.navCtrl.setRoot(HomePage);
    //this.navCtrl.pop();
  }
  subscribeToIonScroll() {
    if (this.content != null && this.content.ionScroll != null) {
      this.content.ionScroll.subscribe((d) => {
        if (d.scrollTop < 200) {
          this.active = false;
          return;
        }
        this.active = true;
      });
    }

  }
  isClassActive() {
    // return this.active;
  }
  drag(item, event) {
    // console.log('');
    this.ws.getActivityResponses(item.id).subscribe(data => { this.temparray(data, item.id) });
  }
  temparray(data, item) {
    if (data !== '' || data !== undefined) {
      let value = JSON.parse(data._body);
      if (value.length === 0) {
        this.toaster.presentToast(this.translate.instant('No any actions for this'));
        return;
      } else {
        this.swipefunctions = value;
      }
    }

    setTimeout(() => {
      this.inboxFunctions();
      this.itemId = item.id;
      this.itemTypeId = item.typeId;
    }, 0);

  }
  onTap(value, itemid, itemtypeid) {
    // console.log(item);
    let temparray = [];
    const activitySubmit = {
      id: itemid,
      typeId: itemtypeid,
      modifiedBy: this.us.getCurrentUser().EmpNo,
      modifierRole: this.us.getCurrentUser().roles['0'].id,
      finishedBy: this.us.getCurrentUser().EmpNo,
      finishedByName: this.us.getCurrentUser().fulName,
      finisherRole: this.us.getCurrentUser().roles['0'].id,
      responseId: value.id,
      comments: '',
      attachments: [],
      routes: [{
        activityType: value.routeToId,
        activityTypeName: value.routeToName,
        roleId: value.roleId,
        roleName: value.roleName
      }]
    };
    temparray.push(activitySubmit);
    this.loading.show();
    this.ws.finishMultipleActivities(temparray).subscribe(data => { this.toaster.presentToast(this.translate.instant('Finished Successfully')); this.refresh(data); }, error => { this.loading.hide(); });

  }
  ionViewWillEnter() {
    this.loading.show();
    this.ws.getInboxItems(this.us.getCurrentUser().EmpNo, 1).subscribe(data => { this.getInboxResult(data); this.loading.hide(); }, error => { this.loading.hide(); });
    this.cfs.getConfiguration('BROWSEDOCS').subscribe(data => {
      this.ss.getWorkTypes().subscribe(value => {
        let dataObjcts = {
          drafts: value,
          docs: data
        }
        this.events.publish('showdocs', dataObjcts);
      }, error => { });
    }, error => { });

    this.userName = this.us.getCurrentUser().fulName;
    this.ws.getInboxItems(this.us.getCurrentUser().EmpNo, 1).subscribe(data => {
      let inboxCount = {
        inbox: data
      };
      this.events.publish('inboxCounts', inboxCount);
    }, error => { });
    setTimeout(() => {
      this.ws.getDraftItems(this.us.getCurrentUser().EmpNo, 1).subscribe(res => {
        let draftsCount = {
          drafts: res
        };
        this.events.publish('draftsCounts', draftsCount);
      }, err => { })
    }, 100);

  }
  refresh(data) {
    this.ws.getInboxItems(this.us.getCurrentUser().EmpNo, 1).subscribe(data => { this.getInboxResult(data); this.loading.hide(); }, error => { this.loading.hide(); });
  }
  showActions(item) {
    // this.ss.getWorkTypeFromID(item.typeId).subscribe(data => { this.temparray(data, item) });
    this.ws.getActivityResponses(item.id).subscribe(data => { this.temparray(data, item) });
  }
  showButtons() {
    let buttons = [];
    for (let index = 0; index < this.swipefunctions.length; index++) {
      let button = {
        text: this.swipefunctions[index].name,
        // icon: this.swipefunctions[index].icon,
        handler: () => {
          // this.onTap(this.swipefunctions[index], this.itemId, this.itemTypeId);
          this.navCtrl.push(ActivityPage, {
            firstParameter: this.itemId,
            taskObject: this.swipefunctions[index],
            readWrite: 'readWrite'
          });

          return true;
        }
      }
      buttons.push(button);
    }
    return buttons;


  }
  inboxFunctions() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: this.showButtons()
    });
    actionSheet.present();
  }
  doRefresh(event) {
    // this.loading.show();
    this.ws.getInboxItems(this.us.getCurrentUser().EmpNo, 1).subscribe(data => { this.getInboxResult(data); event.complete(); }, error => { event.complete(); });
  }
}
