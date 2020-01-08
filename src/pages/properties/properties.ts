import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams, ActionSheetController, ModalController, AlertController, Events, Tabs } from 'ionic-angular';
import { ContentService } from '../../services/content.service';
import { CheckinFilePage } from '../checkin-file/checkin-file';
import { ToastService } from '../../services/toast-service';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the PropertiesPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-properties',
  templateUrl: 'properties.html'
})
export class PropertiesPage implements OnInit{

  @ViewChild('tabs') tabRef: Tabs;
public folderId = undefined;
public docId = undefined;
public repoId = undefined;
public params = {};
public propertyRoot;
public annotationsRoot;
public tabIcons = false;
public propertyButtons = [];
public doumentProperties = [];
public docisReserved;
public callback;
public addedthis = [];
public sharedDownloadlink;
public annoatateBtns = false;
public btnshow = false;
tab : Tabs;
public selected = 0;
  constructor(public navCtrl: NavController, private viewCtrl: ViewController,
      private tr: ToastService, private modalCtrl: ModalController,
      public navParams: NavParams, private actionSheetCtrl: ActionSheetController, private cs: ContentService,
      private alertCtrl: AlertController, private events: Events, private translate: TranslateService) {
    this.folderId = this.navParams.get('folderId');
    this.docId = this.navParams.get('docId');
    this.repoId = this.navParams.get('repoId');
    this.params = {
      folderId : this.navParams.get('folderId'),
      docId : this.navParams.get('docId'),
      repoiId : this.navParams.get('repoId'),
      annotationPageId: '1'
    };
    this.propertyRoot = 'PropertyPage';
    this.annotationsRoot = 'AnnotationsPage';
    if(events !== undefined) {
      events.subscribe('shareObject', (params) => {
        // console.log('Welcome', params.signatureIsEmpty);
       if(params.signatureIsEmpty === 'true') {
        this.annoatateBtns = true;
        this.tabIcons = false;
        this.btnshow = false;
       } else if(params.signatureIsEmpty === 'false'){
        this.annoatateBtns = false;
        this.btnshow = true;
       }
    });

    events.subscribe('shareObjectforadd', (btns) => {
      // console.log('Welcome', params.signatureIsEmpty);
     if(btns.annoatateBtns === 'true') {
      this.annoatateBtns = true;
      this.tabIcons = false;
      this.btnshow = false;
     } else if(btns.annoatateBtns === 'false'){
      this.annoatateBtns = false;
      this.btnshow = true;
     }
  });
  }
  events.publish('hideHeader', { isHidden: true});
  }
  showoOptions() {
    if(  this.propertyButtons.length > 0) {

    const actionSheet = this.actionSheetCtrl.create({
      buttons: this.propertyButtons

   });
    actionSheet.present();
  }
  }
  tabSelected(event) {
    this.propertyButtons = [];
    if(event.index === 0) {
      this.tabIcons = true;
      this.annoatateBtns = false;
      this.btnshow = false;
    } else {
      let objects = {
        save : 'clear'
      }
      this.events.publish('shareObject', objects, 1);
      this.annoatateBtns = false;
      this.tabIcons = false;
    }
  }
  ionViewWillEnter() {
    this.callback = this.navParams.get("callback");
}
  ngOnInit() {
    this.sharedDownloadlink =  this.cs.downloadSharedDocument(this.docId);
this.cs.getThisDocument(this.docId).subscribe(data => {this.thisdocResult(data)})
  }
  thisdocResult(data) {
    this.propertyButtons = [];
    let title = '';
if(data._body !== '') {
  let docprops = JSON.parse(data._body);
  this.doumentProperties = docprops.props;
  title = docprops.docTitle;
  // console.log(docprops);
  this.docisReserved = docprops.isReserved;
  if(this.docisReserved === true) {
    let btns = {
      text: this.translate.instant('Check-in'),
      icon: 'unlock',
      handler: () => {
        setTimeout(() => {
          this.checkInFile();
        }, 100);
         }
    }
    this.propertyButtons.push(btns);
  } else {
    let btns = {
      text: this.translate.instant('Check-out'),
      icon: 'lock',
      handler: () => {
        setTimeout(() => {
          this.checkOutDocument();
        }, 100);
         }
    }
    this.propertyButtons.push(btns);
  }
  let share =   {
      text: this.translate.instant('Sharable Link'),
      icon: 'share',
      handler: () => {
this.share();
      }
    };
    this.propertyButtons.push(share)
  //  let view =  {
  //     text: this.translate.instant('View Task'),
  //     icon: 'eye',
  //     handler: () => {
  //       this.selected = 1;
  //     }
  //   };
  //   this.propertyButtons.push(view);
   let download =  {
      text: this.translate.instant('Download'),
      icon: 'download',
      handler: () => {
        this.cs.downloadDocument(this.docId, title);
      }
    };
  this.propertyButtons.push(download);
}
  }
  share() {
    let alert = this.alertCtrl.create({
      title: this.translate.instant('Sharable Link'),
      // message: this.sharedDownloadlink,
      inputs: [{
        disabled: true,
        value: this.sharedDownloadlink,

      }],
      buttons: [
        {
          text: this.translate.instant('Ok'),
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    alert.present();
  }
  checkOutDocument() {
  this.cs.checkOut(this.docId).subscribe(data => {this.tr.presentToast(this.translate.instant('Document Check-out Success'));this.ngOnInit()});
  }
  checkInFile() {
    let checkInModal = this.modalCtrl.create(CheckinFilePage, { documentId: this.docId, repoId: this.repoId });
    checkInModal.onDidDismiss(data => {
      if(data === 'added') {
        // this.apisResult();
        this.ngOnInit();
      }
    });
    checkInModal.present();
  }
//   close() {
//     this.cs.getSubfolders(this.folderId).subscribe(data => {this.subFolders(data);
//       this.cs.getFolderDocuments(this.folderId).subscribe(data => this.call(data) );} );



//   }
//   subFolders(data) {
//     this.addedthis = [];
// this.addedthis = JSON.parse(data._body);

//   }
//   call(data) {
//     let added = JSON.parse(data._body);
//     this.callback(added, this.addedthis).then(()=>{
//       this.navCtrl.pop();
//   });
//   }
addAnnotated() {

}
saveImageAnnoataions() {
  let objects = {
    save : 'ok'
  }
  this.events.publish('shareObject', objects, 1);
  this.btnshow = true;
}
clear() {
  let objects = {
    save : 'clear'
  }
  this.events.publish('shareObject', objects, 1);
  this.btnshow = true;
}
enable() {
  let objects = {
    enable : 'true'
  }
  this.events.publish('shareObject', objects, 1);
  this.tr.presentToast(this.translate.instant('You can do image annotation now'));
}
}

