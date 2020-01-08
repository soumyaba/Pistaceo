import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { ContentService } from '../../services/content.service';

/**
 * Generated class for the ShowAttachmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-attachment',
  templateUrl: 'show-attachment.html',
})
export class ShowAttachmentPage {
public attachmentres = [];
public  animateClass: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    private platform:Platform, private cs:ContentService) {
    this.animateClass = { 'fade-in-left-item': true };
    platform.ready().then((readySource) => {
    let attachments = this.navParams.get('data');
this.attachmentres = JSON.parse(attachments._body);
// console.log(this.attachmentres[0].docTitle);
for(let i = 0; i < this.attachmentres.length; i++) {
  // console.log(this.attachmentres[i].docId);
}
// if(this.attachmentres.length > 0) {
//   document.getElementById('overflow').style.maxHeight = platform.height() + 'px';
//   document.getElementById('overflow').style.overflowY = 'auto';
//   document.getElementById('overflow').style.overflowX = 'hidden';
// }
});
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ShowAttachmentPage');
  }
  close() {
this.viewCtrl.dismiss('ok');
  }
  download(value) {
this.cs.downloadDocument(value.docId, value.docTitlte);
  }
}
