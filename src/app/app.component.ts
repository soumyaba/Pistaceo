import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Platform, MenuController, Nav, ModalController, NavController, App, AlertController, Events, ViewController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuService } from '../services/menu-service';
import { AppSettings } from '../services/app-settings';
import { IService } from '../services/IService';
import { HttpInterceptor } from '../services/interceptor.service';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../services/user.service';
import { CreatePage } from '../pages/create/create';

@Component({
  templateUrl: 'app.html',
  providers: [MenuService]
})

export class MyApp implements AfterViewInit {
  @ViewChild(Nav) nav: Nav;
  rootPage = "SigninPage";
  pages: any;
  params: any;
  leftMenuTitle: string;
  footerIsHidden = false;
  public userName = '';
  public showDrafts = false;
  public showArchive = false;
  public inboxValueCount = 0;
  public draftsValueCount = 0;
  public createOptionsSelected = -1;
  public createOptions = [];
  public createId: any;
  public showalert = true;
  constructor(public platform: Platform, private splashScreen: SplashScreen, private statusBar: StatusBar, public menu: MenuController, public menuService: MenuService, public modalCtrl: ModalController,
    private app: App, private alertCtrl: AlertController, public errorEvent1: Events,
    public intser: HttpInterceptor, public translate: TranslateService, private us: UserService) {
    this.initializeApp();
    if (localStorage.getItem('user') !== null) {
      let value;
      this.userName = this.us.getCurrentUser().fulName;
    }
    if (localStorage.getItem('language') === 'null' || localStorage.getItem('language') === undefined || localStorage.getItem('language') === null) {
      translate.use('en');
    } else {
      this.translate.use(localStorage.getItem('language'));
    }
    errorEvent1.subscribe('showdocs', dataObjcts => {
      this.dynamicItems(dataObjcts.drafts);
      this.browseDocs(dataObjcts.docs);
    });
    errorEvent1.subscribe('showdocs', dataObjcts => {
      this.dynamicItems(dataObjcts.drafts);
      this.browseDocs(dataObjcts.docs);
    });
    errorEvent1.subscribe('inboxCounts', inboxCount => {
      if (inboxCount.inbox._body !== undefined) {
        const inboxValue = JSON.parse(inboxCount.inbox._body);
        const inboxRes = inboxValue.activities;
        this.inboxValueCount = 0;
        for (let inboxIndex = 0; inboxIndex < inboxRes.length; inboxIndex++) {
          if (inboxRes[inboxIndex].status === 'NEW') {
            this.inboxValueCount++;
          }
        }
      } else {
        this.inboxValueCount = 0;
      }
    });
    errorEvent1.subscribe('draftsCounts', draftsCount => {
      if (draftsCount.drafts._body !== undefined) {
        const draftsValue = JSON.parse(draftsCount.drafts._body);
        const draftsRes = draftsValue.activities;
        this.draftsValueCount = 0;
        this.draftsValueCount = draftsRes.length;
      } else {
        this.draftsValueCount = 0;
      }
    });
    // if(localStorage.getItem('language') === 'null' || localStorage.getItem('language') === undefined) {
    //   translate.use('en');
    //   translate.setDefaultLang('en');
    //   // this.value = 'en';
    //   this.menuService.arrayvalue = ['Dashboard', 'Inbox', 'Sent', 'Drafts', 'Documents', 'Search', 'Archive', 'Settings', 'Logout'];
    // } else {
    // translate.use(localStorage.getItem('language'));
    // // this.value = localStorage.getItem('language');
    // let array = ['Dashboard', 'Inbox', 'Sent', 'Drafts', 'Documents', 'Search', 'Archive', 'Settings', 'Logout'];
    // this.menuService.arrayvalue = [];
    // for(let i = 0; i < array.length; i++) {
    //     this.translate.get(array[i]).subscribe(res => {
    //     this.menuService.arrayvalue.push(res);
    //     this.menuService.getAllThemes()[i].title = res;
    //     });
    //   }

    //   setTimeout(() => {
    //     this.menuService.getAllThemes();
    //   }, 100);
    // }

    this.pages = menuService.getAllThemes();
    this.errorEvent1.subscribe('sentSet', (sent) => {
      for (let amt = 0; amt < this.pages.length; amt++) {
        if (sent.name === this.pages[amt].theme) {
          this.nav.setRoot(this.pages[amt].theme);
          this.createOptionsSelected = -1;
        }
      }
    });
    this.errorEvent1.subscribe('setDashboard', (dashboard) => {
      for (let aks = 0; aks < this.pages.length; aks++) {
        if (dashboard.name === this.pages[aks].theme) {
          this.nav.setRoot(this.pages[aks].theme);
        }
      }
    });
    this.leftMenuTitle = menuService.getTitle();
    this.menuService.load(null).subscribe(snapshot => {
      this.params = snapshot;
    });

    if (AppSettings.SHOW_START_WIZARD) {
      this.presentProfileModal();
    }

    setInterval(() => {
      if (this.intser.forbidden === true) {
        this.app.getRootNav().setRoot('SigninPage');
        localStorage.clear();
        // this.nav.setRoot(this.rootPage);
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    }, 5000);

    this.errorEvent1.subscribe('Forbidden Error', (FORBIDDEN) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      // console.log(FORBIDDEN + 'asd');
      if (FORBIDDEN.forbidden) {
        for (let index = 0; index < this.pages.length; index++) {
          if (this.pages[index].theme === 'SigninPage') {
            this.nav.setRoot(this.pages[index].theme);
            localStorage.clear();
            setTimeout(() => {
              window.location.reload();
            }, 100);
          }
        }
      }

    });
    errorEvent1.subscribe('hideHeader', (data) => {
      this.footerIsHidden = data.isHidden;
    });
    // console.log(localStorage.getItem('language'));
    errorEvent1.subscribe('useLanguage', (data) => {
      localStorage.setItem('Language', data.languageis);
      translate.use(localStorage.getItem('language'));
    });
    if (localStorage.getItem('language') === 'null' || localStorage.getItem('language') === null || localStorage.getItem('language') === undefined) {
      translate.use('en');
    } else {
      translate.use(localStorage.getItem('language'));
    }
  }
  ngAfterViewInit() {
    let currentPage = this.app.getActiveNav().getViews();
    //  console.log('current page is: ', currentPage);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      localStorage.setItem("mailChimpLocal", "true");
    });
    this.platform.registerBackButtonAction(() => {
      // Catches the active view
      let nav = this.app.getActiveNavs()[0];
      let activeView = nav.getActive();
      if (activeView.name === 'SigninPage') {
        localStorage.clear();
        this.platform.exitApp();
      } else {
        if (activeView.name !== 'InboxComponent' && activeView.name !== 'CreatePage') {
          if (activeView.data.component !== undefined) {
            if (activeView.data.component.name === 'AddUrlPage') {
              activeView.dismiss();
              this.footerIsHidden = true;
            } else {
              activeView.dismiss();
              this.footerIsHidden = false;
            }
          } else if (this.nav.canGoBack()) {
            this.nav.pop();
            this.footerIsHidden = false;
          } else {
            this.nav.setRoot('InboxComponent');
            this.footerIsHidden = false;
          }
        } else if (activeView.name === 'CreatePage') {
          const alertthis = this.alertCtrl.create({
            title: this.translate.instant('Save confirm'),
            message: this.translate.instant('Changes are not saved, are you sure to leave?'),
            buttons: [
              {
                text: this.translate.instant('Cancel'),
                handler: () => {
                  //   console.log('Disagree clicked');

                  this.createOptionsSelected = this.createId;
                  this.showalert = false;
                }
              },
              {
                text: this.translate.instant('Agree'),
                handler: () => {
                  for (let index = 0; index < this.pages.length; index++) {
                    if (this.pages[index].theme === 'InboxComponent') {
                      this.nav.setRoot(this.pages[index].theme);
                      this.createOptionsSelected = -1;
                      this.showalert = false;
                    }
                  }
                }

              }
            ],
            enableBackdropDismiss: false
          });
          alertthis.present();
        } else {
          this.showConfirm();
        }
      }

    });
  }

  presentProfileModal() {
    const profileModal = this.modalCtrl.create("IntroPage");
    profileModal.present();
  }

  openPage(page) {
    // console.log(page);
    // close the menu when clicking a link from the menu
    // navigate to the new page if it is not the current page
    this.showalert = true;
    let nav = this.app.getActiveNavs()[0];
    let activeView = nav.getActive();
    if (activeView.name === 'CreatePage' && page.title !== 'Logout') {
      let value = {};
      if (this.showalert) {
        this.createConfirmSave(page, value);
      }
    } else {
      if (page.singlePage) {
        if (page.title === 'Logout') {
          this.showConfirm();
          this.translate.instant(page.title);
        } else {
          this.createOptionsSelected = -1;
          this.menu.open();
          this.nav.push(page.theme);
          this.translate.instant(page.title);
          // this.getPageForOpen(page.theme), {
          //   // service: this.getServiceForPage(page.theme),
          //   // page: page,
          //   // componentName: page.theme
          // }
        }

      } else {
        this.createOptionsSelected = -1;
        this.nav.setRoot(page.theme);
        // this.nav.setRoot("ItemsPage", {
        //   componentName: page.theme
        // });
        // console.log( page.theme);
      }
    }
  }

  getPageForOpen(value: string): any {
    return null;
  }

  getServiceForPage(value: string): IService {
    return null;
  }
  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: this.translate.instant('Logout!'),
      message: this.translate.instant('Are you sure to logout?'),
      buttons: [
        {
          text: this.translate.instant('Cancel'),
          handler: () => {
            //   console.log('Disagree clicked');
            this.createOptionsSelected = this.createOptionsSelected;
          }
        },
        {
          text: this.translate.instant('Agree'),
          handler: () => {
            localStorage.clear();
            //  this.file.removeRecursively(this.file.cacheDirectory, 'com.mybiz.app').catch(err => Pro.monitoring.exception(err))
            this.nav.setRoot(this.rootPage);
            this.platform.exitApp();
            //    setTimeout(() => {
            //     window.location.reload();
            // }, 100);
          }
        }
      ]
    });
    confirm.present();
  }
  dynamicItems(data) {
    const datares = JSON.parse(data._body);
    this.createOptions = [];
    this.createOptions = datares;
    if (datares.length <= 5) {
      for (let i = 0; i < datares.length; i++) {
        if (datares[i].archiveSupport === 1) {
          this.showArchive = true;
          break;
        }
      }
      for (let k = 0; k < datares.length; k++) {
        if (datares[k].draftSupport === 1) {
          this.showDrafts = true;
          break;
        }

      }
    }
    for (let reg = 0; reg < this.pages.length; reg++) {
      if (this.pages[reg].title === 'Archive' && this.showArchive === false) {
        // this.pages.splice(reg, 1);
        break;
      }
    }
    for (let drf = 0; drf < this.pages.length; drf++) {
      if (this.pages[drf].title === 'Drafts' && this.showDrafts === false) {
        this.pages.splice(drf, 1);
        break;
      }
    }
  }
  browseDocs(value) {
    if (value._body !== '') {
      let browseDocs = JSON.parse(value._body);
      if (browseDocs.value !== 'YES') {
        for (let reg = 0; reg < this.pages.length; reg++) {
          if (this.pages[reg].title === 'Documents') {
            this.pages.splice(reg, 1);
            break;
          }
        }
      }
    }
  }
  createOptionChanged(event, page) {
    // console.log(page);
    this.menu.close();
    for (let index = 0; index < this.createOptions.length; index++) {
      if (this.createOptions[index].id === event) {
        let nav = this.app.getActiveNavs()[0];
        let activeView = nav.getActive();
        if (activeView.name === 'CreatePage' && this.showalert) {
          this.createConfirmSave(page, this.createOptions[index]);
        } else {
          this.showalert = true;
          this.createId = this.createOptions[index].id;
          this.nav.setRoot(page.theme, { id: this.createOptions[index].id, initActivityType: this.createOptions[index].initActivityType, multiFormSupport: this.createOptions[index].multiFormSupport, subjectProps: this.createOptions[index].subjectProps });
        }
      }
    }

  }
  createConfirmSave(page, value) {
    const alertthis = this.alertCtrl.create({
      title: this.translate.instant('Save confirm'),
      message: this.translate.instant('Changes are not saved, are you sure to leave?'),
      buttons: [
        {
          text: this.translate.instant('Cancel'),
          handler: () => {
            //   console.log('Disagree clicked');

            this.createOptionsSelected = this.createId;
            this.showalert = false;
          }
        },
        {
          text: this.translate.instant('Agree'),
          handler: () => {
            if (value.id === undefined) {
              this.createOptionsSelected = -1;
              this.nav.setRoot(page.theme);
            } else {
              this.createId = value.id;
              this.showalert = true;
              this.nav.setRoot(page.theme, { id: value.id, initActivityType: value.initActivityType, multiFormSupport: value.multiFormSupport, subjectProps: value.subjectProps });
            }
          }
        }
      ],
      enableBackdropDismiss: false
    });
    alertthis.present();
  }
}
