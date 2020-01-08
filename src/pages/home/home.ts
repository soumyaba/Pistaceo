import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, MenuController, Slides, Platform, Events } from 'ionic-angular';
import { HomeService } from '../../services/home-service';
import { SigninPage } from '../signin/signin';
import { MenuService } from '../../services/menu-service';
import { UserService } from '../../services/user.service';
import { WorkService } from '../../services/work.service';
import { ActivityPage } from '../activity/activity';
import { SchemaService } from '../../services/schema.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfigurationService } from '../../services/configuration.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [HomeService, MenuService]
})
export class HomePage implements OnInit {
  @ViewChild(Slides) slides: Slides;
  data:any = {};
  pages: any;
  params:any;
  leftMenuTitle: string;
  public workLabels = [];
  public workNumbers = [];
  public workChartType:string = 'pie';
  public activityLabels:string[] = [];
  public activityNumbers:number[] = [];
  public activityChartType:string = 'pie';
  public chartColors: Array<any> = [{
    backgroundColor:['#00858d', '#00C292', '#253e70', '#246275', '#2BC5E0', '#FF3A3A', '#49E84E', '#E7632C'] }
    ];
    public workDate:any;
    public workStatus: any;
    public activityDate:any;
    public activityStatus: any;
    public userName: any;
    public IndividualactivityItems = [];
    public userworkItems = [];
    public animateClass: any;
    public individualWorkItems = [];
    public activityValues;
    public userWorkAsscending = true;
    public individualActivityData = [];
    public userActivityAsscending = true;
    public height;
    public setIntervalEvent: any;
  constructor(public navCtrl: NavController, public service:HomeService, public menuService: MenuService,
     public menuCtrl: MenuController, private us:UserService, private ws:WorkService, private platform: Platform,
     private ss: SchemaService, private translate: TranslateService, private cfs: ConfigurationService, public events:Events) {
      this.animateClass = { 'fade-in-left-item': true };
    service.load().subscribe(snapshot => {
      this.data = snapshot;
    });
    // let data = {
    //   name: 'abc'};
    // events.publish('show', data);
     this.pages = menuService.getAllThemes();
    this.leftMenuTitle = menuService.getTitle();

    this.menuService.load(null).subscribe( snapshot => {
       this.params = snapshot;
  });
  this.menuCtrl.enable(true, 'myMenu');
  platform.ready().then((readySource) => {
    this.height = platform.height() * 0.9;
  });
  }
  ngOnInit() {
    this.workDate = 'WEEK';
    this.workStatus = 'STATUS';
    this.activityDate = 'WEEK';
    this.activityStatus = 'STATUS';
    this.ws.getWorkStatistics(this.us.getCurrentUser().EmpNo , this.workDate, 'STATUS').subscribe(data => this.individualWork(data));
    this.ws.getActivityStatistics(this.us.getCurrentUser().EmpNo , this.activityDate, 'STATUS').subscribe(data => this.individualActivity(data));
    this.ws.getUserWorkItemsStatus(this.workDate, 'ALL').subscribe(data => this.getUserWorkItems(data));
    this.ws.getActivityItems(this.activityDate, 'ALL').subscribe(data => this.getUserActivities(data));
     this.cfs.getConfiguration('BROWSEDOCS').subscribe(data => {this.ss.getWorkTypes().subscribe(value => {
       let dataObjcts = {
         drafts : value,
         docs: data
       }
      this.events.publish('showdocs', dataObjcts); }, error =>{} );}, error => {});

  this.userName = this.us.getCurrentUser().fulName;
  this.ws.getInboxItems(this.us.getCurrentUser().EmpNo, 1).subscribe(data =>{ let inboxCount = {
    inbox: data
  };
  this.events.publish('inboxCounts', inboxCount);}, error => {});
  setTimeout(() => {
    this.ws.getDraftItems(this.us.getCurrentUser().EmpNo, 1).subscribe(res => {
      let draftsCount ={
        drafts: res
      };
      this.events.publish('draftsCounts', draftsCount);
    }, err => {})
  }, 100);

  var that = this;
  this.setIntervalEvent = setInterval(() => {
    this.apiForCount();
  }, 60000);

// this.ws.getInboxItems(this.us.getCurrentUser().EmpNo, 1).subscribe(data => {this.ws.getDraftItems(this.us.getCurrentUser().EmpNo, 1)
//   .subscribe(value => {
//     let inboxCount = {
//       inbox: data,
//       drafts: value
//     };
//     this.events.publish('inboxCounts', inboxCount);
//   }, err => {});}, error => {});

  // this.cfs.getConfiguration('BROWSEDOCS').subscribe(data => this.browseDocs(data), error => console.log(error));
  }
  // browseDocs(data) {
  //   if (data._body !== '') {
  //     let browseDocs = JSON.parse(data._body);
  //     if (browseDocs.value === 'YES') {
  //         for (let reg = 0 ; reg < this.pages.length; reg++) {
  //           if (this.pages[reg].title === 'Documents') {
  //         this.pages.splice(reg, 1);
  //         break;
  //           }
  //         }
  //     }
  // }
  // }
  getUserWorkItems(data) {
    this.userworkItems = [];
    this.userworkItems = JSON.parse(data._body);
    // console.log(this.userworkItems.length + ' ' + 'individual user work');
  }
  getUserActivities(data) {
    this.IndividualactivityItems = [];
    this.IndividualactivityItems = JSON.parse(data._body);
  }
  public workClicked(e:any):void {
    if (e.active.length > 0) {
      const chart = e.active[0]._chart;
      const activePoints = chart.getElementAtEvent(e.event);
        if ( activePoints.length > 0) {
          // get the internal index of slice in pie chart
          const clickedElementIndex = activePoints[0]._index;
          const label = chart.data.labels[clickedElementIndex];
          // get value by index
          const value = chart.data.datasets[0].data[clickedElementIndex];
       //   console.log(clickedElementIndex, label, value)
        }
       }
  }
public apiForCount():void {
  this.ws.getInboxItems(this.us.getCurrentUser().EmpNo, 1).subscribe(data =>{ let inboxCount = {
    inbox: data
  };
  this.events.publish('inboxCounts', inboxCount); this.ws.getDraftItems(this.us.getCurrentUser().EmpNo, 1).subscribe(res => {
    let draftsCount ={
      drafts: res
    };
    this.events.publish('draftsCounts', draftsCount);
  }, err => {})}, error => {});

}
  public activityClicked(event:any):void {
    for ( let amt = 0 ; amt < this.individualActivityData.length; amt++) {
      if (event.active[0]._index === amt) {
          if (this.activityStatus === 'TYPE') {
              this.ws.getActivityItemsType(this.activityDate, this.individualActivityData[amt].typeId).subscribe(data => this.getUserActivities(data));

          }else {
           this.ws.getActivityItems(this.activityDate, this.individualActivityData[amt].name).subscribe(data => this.getUserActivities(data));
           }
      }
 }
  }
  individualWork(data) {
// console.log(JSON.parse(data._body));
let value = JSON.parse(data._body);
this.workLabels = [];
this.workNumbers = [];
let labels = [];
let numbers = [];
this.individualWorkItems = JSON.parse(data._body);
for(let i = 0; i < value.length; i++) {
  // if(i !== value.length -1) {
    labels.push(value[i].name);
    numbers.push(value[i].count);
  // }else{
  //   this.workLabels.push(value[i].name );
  //   this.workNumbers.push(value[i].count);
  // }
}
setTimeout(() => {
this.workLabels = labels;
this.workNumbers = numbers;
}, 0);
// console.log(this.workLabels);
  }
  individualActivity(data) {
 //   console.log(JSON.parse(data._body));
 let value = JSON.parse(data._body);
 this.activityLabels = [];
 this.activityNumbers = [];
 let labels = [];
let numbers = [];
this.individualActivityData = JSON.parse(data._body);
 for(let i = 0; i < value.length; i++) {
    labels.push(value[i].name);
    numbers.push(value[i].count);
}
setTimeout(() => {
  this.activityLabels = labels;
  this.activityNumbers = numbers;
}, 0);
  }
  workdatetype(value) {
this.workDate = value;
this.ws.getWorkStatistics(this.us.getCurrentUser().EmpNo , this.workDate, this.workStatus).subscribe(data => this.individualWork(data));
if (this.workStatus === 'TYPE') {
  this.ws.getUserWorkItemsType(this.workDate, this.workStatus).subscribe(data => this.getUserWorkItems(data));
  } else {
    this.ws.getUserWorkItemsStatus(this.workDate, 'ALL').subscribe(data => this.getUserWorkItems(data));

  }
  }
  worktype(value) {
this.workStatus = value;
this.ws.getWorkStatistics(this.us.getCurrentUser().EmpNo ,this.workDate, this.workStatus).subscribe(data => this.individualWork(data));
if (this.workStatus === 'TYPE') {
  this.ws.getUserWorkItemsType(this.workDate, this.workStatus).subscribe(data => this.getUserWorkItems(data));
  } else {
    this.ws.getUserWorkItemsStatus(this.workDate, 'ALL').subscribe(data => this.getUserWorkItems(data));

  }
  }
  activitydatetype(value) {
this.activityDate = value;
this.ws.getActivityStatistics(this.us.getCurrentUser().EmpNo , this.activityDate ,this.activityStatus).subscribe(data => this.individualActivity(data));
if (this.activityStatus === 'TYPE') {
  this.ws.getActivityItemsType(this.activityDate, this.activityStatus).subscribe(data => this.getUserActivities(data));
  } else {
    this.ws.getActivityItems(this.activityDate, 'ALL').subscribe(data => this.getUserActivities(data));

  }
  }
  activitytype(value) {
    this.activityStatus = value;
    this.ws.getActivityStatistics(this.us.getCurrentUser().EmpNo , this.activityDate , this.activityStatus).subscribe(data => this.individualActivity(data));
    if (this.activityStatus === 'TYPE') {
      this.ws.getActivityItemsType(this.activityDate, this.activityStatus).subscribe(data => this.getUserActivities(data));
      } else {
        this.ws.getActivityItems(this.activityDate, 'ALL').subscribe(data => this.getUserActivities(data));

      }
  }
  slideChanged() {
let index = this.slides.getActiveIndex();
if(index === 2) {
  this.slides.slideTo(0);
}
  }
  onUserWorkInput(event) {
    if (this.workStatus === 'TYPE') {
      this.ws.getUserWorkItemsType(this.workDate, this.workStatus).subscribe(data => this.filterUserWorkItems(data, event));
      } else {
        this.ws.getUserWorkItemsStatus(this.workDate, 'ALL').subscribe(data => this.filterUserWorkItems(data, event));

      }
  }
  useritemClick(item) {
    this.ws.getWorkActivity(item.id).subscribe(data => {this.goToActivity(data); });
  }
  goToActivity(data) {
    const value = JSON.parse(data._body);
  this.ws.getActivityInfo(value).subscribe(datares => this.getactivityinfo(datares) , error => (error));
  }
  getactivityinfo(data) {
    this.activityValues = JSON.parse(data._body);
    if (this.activityValues.status === 'DRAFT') {
      this.navCtrl.push(ActivityPage, {firstParameter: this.activityValues.id,  readWrite: 'readOnly', taskfrom:'Drafts'});
    }else if (this.activityValues.status === 'NEW' || this.activityValues.status === 'READ') {
      this.navCtrl.push(ActivityPage, {
        firstParameter: this.activityValues.id,
        readWrite: 'readOnly',
        taskfrom: 'Inbox'
      });
    }else if (this.activityValues.status !== 'NEW' &&  this.activityValues.status !== 'READ' && this.activityValues.status !== 'DRAFT') {
      this.navCtrl.push(ActivityPage, {
        firstParameter: this.activityValues.id,
        readWrite: 'readOnly',
        taskfrom: 'Sent'
      });
    }
  }
  filterUserWorkItems(data, event) {
    this.userworkItems = [];
    this.userworkItems = JSON.parse(data._body);
    const val = event.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.userworkItems = this.userworkItems.filter((item) => {
        if(item.pendingWith !== undefined) {
         return (item.subject.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.status.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.pendingWith.toLowerCase().indexOf(val.toLowerCase()) > -1 );
        } else {
         return (item.subject.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.status.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
      })
    }
  }
  transformAsscending(args?: any): Array<string> {
    this.userWorkAsscending = !this.userWorkAsscending;
    this.userworkItems.sort((a, b) => {
      if(a[args] !== undefined && b[args] !== undefined) {
      if(a[args].toLowerCase() < b[args].toLowerCase()){
        if(this.userWorkAsscending === true) {
          return -1 ;
        } else {
          return 1;
        }
      }
      else if( a[args].toLowerCase() > b[args].toLowerCase()){
        if(this.userWorkAsscending === true) {
          return 1 ;
        } else {
          return -1;
        }
      }
      else {
          return 0;
      }
    } else {
    return 0;
    }
    });
    return this.userworkItems;
  }
  individualworkclicked(event) {
    // console.log(event.active[0]._index);
    for ( let amt = 0 ; amt < this.individualWorkItems.length; amt++) {
      if (event.active[0]._index=== amt) {
          if (this.workStatus === 'TYPE') {
              this.ws.getUserWorkItemsType(this.workDate, this.individualWorkItems[amt].typeId).subscribe(data => this.getUserWorkItems(data));

          }else {
           this.ws.getUserWorkItemsStatus(this.workDate, this.individualWorkItems[amt].name).subscribe(data => this.getUserWorkItems(data));
           }
      }
 }
}
transformDescending(args?: any): Array<string> {
  this.userActivityAsscending = !this.userActivityAsscending;
  this.IndividualactivityItems.sort((a, b) => {
    if(a[args] !== undefined && b[args] !== undefined) {
    if(a[args].toLowerCase() < b[args].toLowerCase()){
      if(this.userActivityAsscending) {
        return 1 ;
      } else {
        return -1;
      }
    }
    else if( a[args].toLowerCase() > b[args].toLowerCase()){
      if(this.userActivityAsscending) {
        return -1 ;
      } else {
        return 1;
      }
    }
    else {
        return 0;
    }
  } else {
  return 0;
  }
  });
  return this.IndividualactivityItems;
}
onUserActivityInput(event) {
  if (this.activityStatus === 'TYPE') {
    this.ws.getActivityItemsType(this.activityDate, this.activityStatus).subscribe(data => this.getUserFilterActivities(data, event));
    } else {
      this.ws.getActivityItems(this.activityDate, 'ALL').subscribe(data => this.getUserFilterActivities(data, event));

    }
}
getUserFilterActivities(data, event) {
  this.IndividualactivityItems = [];
    this.IndividualactivityItems = JSON.parse(data._body);
    const val = event.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.IndividualactivityItems = this.IndividualactivityItems.filter((item) => {
        if(item.pendingWith !== undefined) {
         return (item.subject.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.status.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.pendingWith.toLowerCase().indexOf(val.toLowerCase()) > -1 );
        } else {
         return (item.subject.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.status.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
      })
    }
}
useractivityitemClick(event) {
  if (event.status === 'DRAFT') {
    this.navCtrl.push(ActivityPage, {firstParameter: event.id,  readWrite: 'readOnly', taskfrom:'Drafts'});
  }else if (event.status === 'NEW' || event.status === 'READ') {
    this.navCtrl.push(ActivityPage, {firstParameter: event.id,  readWrite: 'readOnly', taskfrom:'Inbox'});
  }else if (event.status !== 'NEW' &&  event.status !== 'READ' && event.status !== 'DRAFT') {
    this.navCtrl.push(ActivityPage, {firstParameter: event.id,  readWrite: 'readOnly', taskfrom:'Sent'});
  }else {
    this.navCtrl.push(ActivityPage, {firstParameter: event.id,  readWrite: 'readOnly', taskfrom:'Sent'});
    }
}

}
