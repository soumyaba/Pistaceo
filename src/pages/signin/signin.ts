import { Component, Input } from '@angular/core';
import { NavController, NavParams, IonicPage, Nav, MenuController, LoadingController, AlertController, Events, ModalController, App, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginService } from '../../services/login-service';
import { IService } from '../../services/IService';
import { LoadingService } from '../../services/loading-service';
import { ToastService } from '../../services/toast-service';
import { UserService } from '../../services/user.service';
import { GlobalService } from '../../services/global.service';
import { TranslateService } from '@ngx-translate/core';
import { timestamp } from 'rxjs/operators';
import { AddUrlPage } from '../add-url/add-url';
import { MenuService } from '../../services/menu-service';
/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
  providers: [LoginService]
})
export class SigninPage {

  // @Input() data: any;
  // @Input() events: any;

  public username: string;
  public password: string;
  public user: any;
  pages: any;
  params: any;
  leftMenuTitle: string;
  private isUsernameValid: boolean = true;
  private isPasswordValid: boolean = true;
  public base_url;
  public rtlSupport = 'ltr';
  passwordType: string = 'password';
  passwordIcon: string = 'eye';
  public isAndroid = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public nav: Nav, private loginService: LoginService, private loading: LoadingService, private toastCtrl: ToastService,
    private menuCtrl: MenuController, private service: UserService, private alertCtrl: AlertController,
    private tr: ToastService, public events: Events, private global: GlobalService,
    private translate: TranslateService, private modalCtrl: ModalController, private menuservice: MenuService, private platform: Platform) {
    this.menuCtrl.enable(false, 'myMenu');
    if (localStorage.getItem('token') === undefined || localStorage.getItem('token') === null) {
      const dashboard = {
        name: 'SigninPage' // HomePage
      };
      this.events.publish('setDashboard', dashboard);
    } else {
      const dashboard = {
        name: 'InboxComponent' // HomePage
      };
      this.events.publish('setDashboard', dashboard);
    }
    this.base_url = global.baseUrl;
    events.publish('hideHeader', { isHidden: true });
    if (this.navParams.get('url') === undefined || this.navParams.get('url') === null || this.navParams.get('url') === 'null') {
      this.base_url = 'https://www.pistaceo.com/pistaceo/resources/';
      this.global.baseUrl = this.base_url;
      window.localStorage.setItem('baseurls', this.base_url);
      this.global.setURL();
      // this.base_url = data;
    }
    if (localStorage.getItem('language') !== 'null' && localStorage.getItem('language') !== null && localStorage.getItem('language') !== undefined) {
      if (localStorage.getItem('language') === 'ar') {
        this.rtlSupport = 'rtl';
      } else {
        this.rtlSupport = 'ltr';
      }
    } else {
      this.rtlSupport = 'ltr';
      this.translate.use('en');
    }
    platform.ready().then((readySource) => {
      if (platform.is('ipad')) {
        // console.log('ipad');
        this.isAndroid = false;
      }
      else {
        if (this.platform.isLandscape()) {
          // console.log('tab landscape');
          this.isAndroid = false;
        } else {
          //  console.log('android');
          this.isAndroid = true;
        }
      }

      if (platform.is('tablet')) {
        this.isAndroid = false;
        if (this.platform.isLandscape()) {
          // console.log('tab landscape');

        } else {
          // console.log('tab');
        }
      }
    });
  }
  ionViewWillLeave() {
    //Make footer visiable while leaving the page.
    this.events.publish('hideHeader', { isHidden: false });
  }


  validate(): boolean {
    this.isUsernameValid = true;
    this.isPasswordValid = true;

    if (!this.username || this.username.length == 0) {
      this.isUsernameValid = false;
    }

    if (!this.password || this.password.length == 0) {
      this.isPasswordValid = false;
    }

    return this.isPasswordValid && this.isUsernameValid;
  }
  goToHomePage() {
    if (!this.validate()) {
      return;
    } else {
      if (this.base_url === null) {
        this.tr.presentToast(this.translate.instant('URL is not set'));
      } else {
        const username = btoa(this.username);
        const password = btoa(this.password);
        localStorage.clear();
        this.loading.show();
        this.service.authenticateUser(username, password, this.base_url).subscribe(data => {
          this.login(username, password, data, this.base_url);

        }, error => {
          //      this.signIn= true;
          //    document.getElementById('spinner').style.display = 'none';
          this.loading.hide();
          //  this.toastCtrl.presentToast('Invalid Username or Password');
          localStorage.removeItem('token');
        });
      }
    }
  }
  forgotPassword() {

  }
  login(username, password, data, urls) {
    let token = '';
    token = data._body;
    localStorage.setItem('token', token);
    this.service.logIn(username, password, token, urls).subscribe(
      data => {
        if (data._body !== '') {
          this.user = JSON.parse(data._body);
          localStorage.setItem('user', JSON.stringify(this.user));
          if (localStorage.getItem('language') === 'null' || localStorage.getItem('language') === undefined) {
            localStorage.setItem('language', 'en');
          }
          //    this.router.navigateByUrl(`/home`);
          this.toastCtrl.presentToast('Login Success');
          // this.menuservice.apiToShowMenuitems();
          //  this.navCtrl.setRoot(HomePage);
          const dashboard = {
            name: 'InboxComponent' // HomePage
          };
          this.events.publish('setDashboard', dashboard);
          this.loading.hide();

        } else {
          this.loading.hide();
          // this.toastCtrl.presentToast('Failed to login');
        }
      }, error => {
        this.loading.hide();
        // this.toastCtrl.presentToast('Failed to login');
        localStorage.removeItem('token');
      });
  }
  addurl() {
    const baseurls = window.localStorage.getItem('baseurls');
    let urlModal = this.modalCtrl.create(AddUrlPage, { url: baseurls });
    urlModal.onDidDismiss(data => {
      if (data !== 'closed') {
        setTimeout(() => {
          if (data !== null && data !== '') {
            if (data[data.length - 1] !== '/') {
              data = data + '/';
            }
            let value = data.toLowerCase();
            if (value.includes('resources')) {
              // console.log(data);
            } else {
              data = data + 'resources/';
              // console.log(data);
            }
            this.global.baseUrl = data;
            window.localStorage.setItem('baseurls', data);
            this.global.setURL();
            this.base_url = data;
            this.tr.presentToast(this.translate.instant('URL is added'));

          } else if (data === '') {
            this.tr.presentToast(this.translate.instant('URL can not be empty'));
          }
        }, 0);


      }
    });
    urlModal.present();
    //   const prompt = this.alertCtrl.create({
    //     title: this.translate.instant('Set New URL'),
    //     inputs: [
    //       {
    //         type: 'textarea',
    //         name: 'url',
    //         placeholder: this.translate.instant('Enter URL To Set'),
    //         value: window.localStorage.getItem('baseurls')
    //       },
    //     ],
    //     cssClass: 'alertCustomCss',
    //     buttons: [
    //       {
    //         text: this.translate.instant('Cancel'),
    //         handler: data => {
    //           data.url = '';
    //         }
    //       },
    //       {
    //         text: this.translate.instant('Save'),
    //         handler: data => {
    //           // console.log('Saved clicked'+ data.folderName);
    //           if(data.url !== '') {
    //         // this.global.baseUrl = data.url;
    //         // window.localStorage.setItem('baseurls', data.url);
    //         //  this.global.setURL();
    //         //  this.base_url = data.url;
    //         //  this.tr.presentToast(this.translate.instant('URL is added'));

    //           } else {
    //             this.tr.presentToast(this.translate.instant('URL can not be empty'));
    //           }
    //         }
    //       }
    //     ]
    //   });
    //   prompt.present();
  }
  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
}


