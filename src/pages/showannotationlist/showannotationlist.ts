import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { LoadingService } from '../../services/loading-service';
import { ContentService } from '../../services/content.service';
import { ToastService } from '../../services/toast-service';

/**
 * Generated class for the ShowannotationlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-showannotationlist',
  templateUrl: 'showannotationlist.html',
})
export class ShowannotationlistPage {
public docId = undefined;
public listOfDcumentAnnotation = [];
public animateClass;
  constructor(public navCtrl: NavController, public navParams: NavParams, private translate: TranslateService,
     private viewCtrl: ViewController, private loading: LoadingService, private cs:ContentService, private tr: ToastService) {
  this.docId = this.navParams.get('docId');
  this.animateClass = { 'fade-in-left-item': true };
}

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ShowannotationlistPage');
  }
  close() {
    this.viewCtrl.dismiss('closed');
  }
  ionViewWillEnter() {
    this.listOfDcumentAnnotation = [];
this.loading.show();
this.cs.getAnnotations(this.docId).subscribe(data => {this.getListOfAnnoattion(data); this.loading.hide();}, error => {this.loading.hide()});
  }
  getListOfAnnoattion(data) {
    this.listOfDcumentAnnotation = [];
    let resData = JSON.parse(data._body);
    if (resData.length === 0 ) {
      this.tr.presentToast(this.translate.instant('No annotation found on this document'));
    }else {
      this.listOfDcumentAnnotation = JSON.parse(data._body);
    }
  }
  itemClick(item) {
    if(item.type === 'IMAGE') {
      this.viewCtrl.dismiss(item.pageNo);
    } else {
      this.tr.presentToast(this.translate.instant('You can view only image anntoations!'));
      this.viewCtrl.dismiss('closed');
    }

  }
}
