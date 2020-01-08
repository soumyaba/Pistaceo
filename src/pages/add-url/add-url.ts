import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the AddUrlPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-url',
  templateUrl: 'add-url.html',
})
export class AddUrlPage {
  public animateClass: any;
  public signinURL;
  public rtlSupport = 'ltr';
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private translate: TranslateService) {
    this.animateClass = { 'fade-in-left-item': true };
    if (this.navParams.get('url') === 'undefined' || this.navParams.get('url') === null || this.navParams.get('url') === 'null') {
      this.signinURL = 'https://www.pistaceo.com/pistaceo/resources/';
      localStorage.setItem('baseurls', this.signinURL);
    } else {
      this.signinURL = this.navParams.get('url');
    }
    if (localStorage.getItem('language') === 'ar') {
      this.rtlSupport = 'rtl';
    } else {
      this.rtlSupport = 'ltr';
    }
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad AddUrlPage');
    // this.signinURL = this.navParams.get('url');
  }
  close() {
    this.viewCtrl.dismiss('closed');
  }
  saveURL(value) {
    this.viewCtrl.dismiss(value);
  }
}
