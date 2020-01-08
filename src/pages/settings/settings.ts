import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Events } from 'ionic-angular';
import { SignaturePadComponent } from '../../components/signature-pad/signature-pad';
import { ToastService } from '../../services/toast-service';
import { DocumentService } from '../../services/document.service';
import { UserService } from '../../services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { MenuService } from '../../services/menu-service';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage implements OnInit{
  @ViewChild('signature') SignaturePad: SignaturePadComponent;
  public signUrl: string;
  public canvasWidth;
public canvasheight;
public base64data;
public signatureUrl;
public showpinui;
public isempty = false;
public currentSignatureShow = true;
public showAddSignature = false;
public sec: string = 'general';
public langOptions = [];
public currentLang = 'en';
  constructor(public navCtrl: NavController, public navParams: NavParams, private tr: ToastService,
    private ds: DocumentService, private us: UserService, private platform: Platform,
    private _sanitizer: DomSanitizer, public translate: TranslateService, public events: Events, private menuService: MenuService) {
      platform.ready().then((readySource) => {
        // console.log('Width: ' + platform.width());
        // console.log('Height: ' + platform.height());
       if(platform.is('ipad')){
        this.canvasWidth = platform.width() * 0.65;
        this.canvasheight = platform.height() / 2;
        } else{
        this.canvasWidth = platform.width() - 50 ;
        this.canvasheight = platform.height() / 2;
        };
        // console.log(localStorage.getItem('language'));
      });
      this.langOptions = [
        {label: 'English', value: 'en'},
        // {label: 'Kannada - ಕನ್ನಡ', value: 'ka'},
        {label: 'Arabic ( عربى)', value: 'ar'}
      ];
      let array ;
      array = [];
      for (const amt of this.langOptions) {
        array.push(amt.value);
      }
      setTimeout(() => {
        translate.addLangs(array);
       // console.log(translate.langs);
      }, 0);

  }
ngOnInit() {
  this.ds.downloadDocument(this.us.getCurrentUser().signature).subscribe(data => this.showSignature(data));
  this.currentLang = this.menuService.value;
  // console.log(this.currentLang);
  // if(localStorage.getItem('language') === null || localStorage.getItem('language') === undefined) {
  //   this.currentLang = 'en';
  // } else{
  // this.currentLang = localStorage.getItem('language');
  // }
}
  ionViewDidLoad() {
    // console.log('ionViewDidLoad SettingsPage');
  }
  showSignature(data) {
      let base64data;
      var reader = new FileReader();
     reader.readAsDataURL(data._body);
     reader.onloadend = function() {
      base64data = reader.result;
     };
     this.base64data = base64data;
      let objectURL = URL.createObjectURL(data._body);
      this.signatureUrl = this._sanitizer.bypassSecurityTrustResourceUrl(objectURL);
  }
  drawComplete(event) {
this.isempty = true;
  }
  generatepin() {
    this.us.generatePin().subscribe(data => this.showpin(data));
  }
  showpin(data) {
    this.showpinui = JSON.parse(data._body);
  }
  save() {
    if(this.SignaturePad !== undefined) {
    this.signUrl = this.SignaturePad.toDataURL();
    const byteCharacters  = atob(this.signUrl.replace('data:image/png;base64,', ''));
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray] , { type: 'image/png' } );
          // saveAs(blob, this.activityinfo.refNo);
            let string: String;
            string = this.us.getCurrentUser().EmpNo + '-digitalSignature.png';
          const docInfo = {
           docclass: 'ProductivitiSignature',
           props: [{
             'name': 'Document Title',
             'symName': 'DocumentTitle',
             'dtype': 'STRING',
             'mvalues': [ string ],
             'mtype': 'N',
             'len': 255,
             'rOnly': 'false',
             'hidden': 'false',
             'req': 'false'
           }],
           accessPolicies: []
         };
          let formData = new FormData();
         formData.append('DocInfo', JSON.stringify(docInfo));
        // formData.append('file', scannedPdfName);
         formData.append('document', blob , this.us.getCurrentUser().EmpNo + '-digitalSignature.png');
      if (this.SignaturePad !== undefined) {
          this.ds.addDocument(formData).subscribe(data => {this.savefor(data);});
        }
      }
  }
  savefor(data) {
    let userObject = JSON.parse(localStorage.getItem('user'));
    userObject.signature = data._body;
    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(userObject));
    this.savesig(data._body);
  }
  savesig(data) {
    if (data !== '') {
      this.us.saveSignature(data).subscribe(resdata => {this.tr.presentToast(this.translate.instant('Signature Saved')); this.isempty = false;});
      this.showpinui = '';
      data = '';
      this.signatureShow();
          }
  }
  signatureShow() {
  if (this.us.getCurrentUser().signature !== undefined) {
    this.ds.downloadDocument(this.us.getCurrentUser().signature).subscribe(data => this.showSignature(data));
    this.currentSignatureShow = true;
    this.showAddSignature = false;
  }else {
    this.currentSignatureShow = false;
    this.showAddSignature = true;
  }
}
  clear() {
if(this.SignaturePad !== undefined) {
  this.SignaturePad.clear();
  this.isempty = false;
}
  }
  addsignature() {
this.showAddSignature = !this.showAddSignature;
  }
  langChanged(event) {
    console.log(event);
window.localStorage.setItem('language', event);
this.translate.use(event);
this.events.publish('useLanguage', { languageis: event});
this.navCtrl.setRoot(this.navCtrl.getActive().component);
// location.reload();
this.menuService.useLanguage(event);
this.currentLang = event;
// const browserLang: string = this.translate.getBrowserLang();
//         this.translate.use(localStorage.getItem('language') ? browserLang : 'en');
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }
}
