import { IService } from './IService';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from './app-settings'
import { LoadingService } from './loading-service'
import { UserService } from './user.service';
import { HttpInterceptor } from './interceptor.service';
import { Events, Platform, NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { SchemaService } from './schema.service';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class MenuService implements IService {
  title: any;
  value: any;
  arrayvalue = [];
  rtlSupport = 'ltr';
  constructor(private loadingService: LoadingService, private us: UserService,
    private interceptor: HttpInterceptor, public translate: TranslateService,
    public events: Events, public platform: Platform) {
    platform.ready().then((readySource) => {
      // console.log(window.localStorage.getItem('language'));
      this.useLanguage(localStorage.getItem('language'));
      events.subscribe('useLanguage', (data) => {
        localStorage.setItem('Language', data.languageis);
        translate.use(localStorage.getItem('language'));
      });
      // console.log(browserLang);
      if (localStorage.getItem('language') === 'null' || localStorage.getItem('language') === undefined || localStorage.getItem('language') === null) {
        translate.use('en');
        translate.setDefaultLang('en');
        //
        this.value = 'en';
        this.arrayvalue = ['Dashboard', 'Inbox', 'Sent', 'Drafts', 'Documents', 'Search', 'Archive', 'Settings', 'Logout'];
      } else {
        translate.use(localStorage.getItem('language'));
        this.value = localStorage.getItem('language');
        let array = ['Dashboard', 'Inbox', 'Sent', 'Drafts', 'Documents', 'Search', 'Archive', 'Settings', 'Logout'];
        this.arrayvalue = [];
        for (let i = 0; i < array.length; i++) {
          this.translate.get(array[i]).subscribe(res => {
            this.arrayvalue.push(res);
            this.getAllThemes()[i].title = res;
          });
        }
        setTimeout(() => {
          this.getAllThemes();
        }, 100);
        if (localStorage.getItem('language') === 'ar') {
          this.rtlSupport = 'rtl';
          platform.setDir('rtl', true);
          this.value = localStorage.getItem('language');
        } else {
          this.rtlSupport = 'ltr';
          platform.setDir('ltr', true);
          this.value = localStorage.getItem('language');
        }
      }
    });
  }
  getId = (): string => 'menu';

  getTitle = (): string => 'UIAppTemplate';

  getAllThemes = (): Array<any> => {
    return [
      { "title": "Dashboard", "theme": "HomePage", "icon": "icon-home", "listView": true, "component": "", "singlePage": false },
      { "title": "Create", "theme": "CreatePage", "icon": "icon-pencil", "listView": false, "component": "", "singlePage": false },
      { "title": "Inbox", "theme": "InboxComponent", "icon": "icon-gmail", "listView": true, "component": "InboxComponent", "singlePage": false },
      { "title": "Sent", "theme": "SentPage", "icon": "icon-send", "listView": true, "component": "", "singlePage": false },
      { "title": "Drafts", "theme": "DraftsPage", "icon": "icon-store", "listView": true, "component": "", "singlePage": false },
      { "title": "Archive", "theme": "ArchivePage", "icon": "icon-book-variant", "listView": true, "component": "", "singlePage": false },
      { "title": "Documents", "theme": "DocumentPage", "icon": "icon-file-document", "listView": true, "component": "", "singlePage": false },
      { "title": "Search", "theme": "SearchPage", "icon": "icon-account-search", "listView": true, "component": "", "singlePage": false },
      { "title": "Settings", "theme": "SettingsPage", "icon": "icon-settings", "listView": true, "component": "", "singlePage": false },
      { "title": "Logout", "theme": "Logout", "icon": "icon-logout", "listView": true, "component": "", "singlePage": true }
      //  {"title" : "List Views", "theme"  : "listViews",  "icon" : "icon-format-align-justify", "listView" : true, "component": "", "singlePage":false},
      // {"title" : "Parallax", "theme"  : "parallax",  "icon" : "icon-format-line-spacing", "listView" : false, "component":"", "singlePage":false},
      // {"title" : "Login Pages", "theme"  : "login",  "icon" : "icon-lock-open-outline", "listView" : false, "component":"", "singlePage":false},
      // {"title" : "Register Pages", "theme"  : "register",  "icon" : "icon-comment-account", "listView" : false, "component":"", "singlePage":false},
      // {"title" : "Image Gallery", "theme"  : "imageGallery",  "icon" : "icon-apps", "listView" : false, "component":"", "singlePage":false},
      // {"title" : "Splash Screen", "theme"  : "splashScreens",  "icon" : "icon-logout", "listView" : false, "component":"", "singlePage":false},
      // {"title" : "Check Boxs", "theme"  : "checkBoxes",  "icon" : "icon-checkbox-marked", "listView" : false, "component":"", "singlePage":false},
      // {"title" : "Search Bars", "theme"  : "searchBars",  "icon" : "icon-magnify", "listView" : false, "component":"", "singlePage":false},
      // {"title" : "Typo + small components", "theme"  : "textViews",  "icon" : "icon-tumblr", "listView" : false, "component":"", "singlePage":false},
      // {"title" : "Wizard", "theme"  : "wizard",  "icon" : "icon-cellphone-settings", "listView" : false, "component":"", "singlePage":false},
      // {"title" : "Spinner", "theme"  : "spinner",  "icon" : "icon-image-filter-tilt-shift", "listView" : false, "component":"", "singlePage":false},
      // {"title" : "Tabs", "theme"  : "tabs",  "icon" : "icon-view-array", "listView" : false, "component":"", "singlePage":false},
      // {"title" : "Maps", "theme"  : "maps",  "icon" : "icon-google-maps", "listView" : false, "component":"", "singlePage":false},
      // {"title" : "QRCode", "theme"  : "qrcode",  "icon" : "icon-qrcode", "listView" : false, "component":"", "singlePage":false},
      // {"title" : "Radio Button", "theme"  : "radioButton",  "icon" : "icon-radiobox-marked", "listView" : false, "component":"", "singlePage":false},
      // {"title" : "Range", "theme"  : "range",  "icon" : "icon-toggle-switch-off", "listView" : false, "component":"", "singlePage":false},
      // {"title" : "Toggle", "theme"  : "toggle",  "icon" : "icon-toggle-switch", "listView" : false, "component":"", "singlePage":false},
      // {"title" : "Select", "theme"  : "select",  "icon" : "icon-menu-down", "listView" : true, "component":"", "singlePage":false},
      // {"title" : "Action Sheet", "theme"  : "actionSheet",  "icon" : "icon-dots-horizontal", "listView" : false, "component":"", "singlePage":false}
    ];
  };
  getDataForTheme = () => {
    // for(let i = 0; i < this.getAllThemes().length; i++) {
    //   this.translate.get(this.getAllThemes()[i].title).subscribe(res => {
    //     // testTrad = res;
    //    console.log(res);
    //     this.getAllThemes()[i].title = res;
    //   });
    // }
    // this.change.detectChanges();
    return {
      "background": "assets/images/icons/1.jpg",
      "title": this.translate.instant('Welcome To Pistaceo'),
      "description": '',
      "image": "assets/images/icons/favicon.png"
    };
  };
  getEventsForTheme = (menuItem: any): any => {
    return {};
  };
  transEvent(abc) {
    let value = '';
    this.translate.get(abc).subscribe(res => {

      value = res;
      // console.log(res);
      return res;
      //  value =   this.translate.instant(res);
    });
    // console.log(value);
    // return value;
  }
  useLanguage(language) {
    // localStorage.setItem('language', language);
    this.translate.use(localStorage.getItem('language'));
    this.value = language;
    // const browserLang: string = this.translate.getBrowserLang();
    // this.translate.use(localStorage.getItem('language') ? localStorage.getItem('language') : 'en');
    // console.log(window.localStorage.getItem('language'));
    if (window.localStorage.getItem('language') === 'ar') {
      this.rtlSupport = 'rtl';
      this.platform.setDir('rtl', true);
      this.value = localStorage.getItem('language');
    } else {
      this.rtlSupport = 'ltr';
      this.platform.setDir('ltr', true);
      this.value = localStorage.getItem('language');
    }
  }
  prepareParams = (item: any) => {
    return {
      title: item.title,
      data: {},
      events: this.getEventsForTheme(item)
    };
  };

  load(item: any): Observable<any> {
    var that = this;
    that.loadingService.show();
    if (AppSettings.IS_FIREBASE_ENABLED) {
      return new Observable(observer => {
        // this.af
        //   .object('menu')
        //   .valueChanges()
        //   .subscribe(snapshot => {
        //     that.loadingService.hide();
        //     observer.next(snapshot);
        //     observer.complete();
        //   }, err => {
        //     that.loadingService.hide();
        //     observer.error([]);
        //     observer.complete();
        //   });
      });
    } else {
      return new Observable(observer => {
        that.loadingService.hide();
        observer.next(this.getDataForTheme());
        observer.complete();
      });
    }
  }
}
