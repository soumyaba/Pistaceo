import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HttpService } from '../../services/HttpService';
import { ValidationService } from '../../services/validation';
import { MailChimpService } from '../../services/mail-chimp-service';

import { IService } from '../../services/IService';

import { AppSettings } from '../../services/app-settings';
import { LoginService } from '../../services/login-service';

@IonicPage()
@Component({
  templateUrl: 'items.html',
  providers: [
    LoginService,MailChimpService,
    HttpService, ValidationService]
})

export class ItemsPage {
  title: string;
  componentName: string;
  pages: any;
  listServices: { [key: string]: IService; } = {};
  service: IService;

  // services: array
  constructor(public navCtrl: NavController,
    private loginService: LoginService,
     private httpService: HttpService,
     private validationService: ValidationService,
     private mailChimpService: MailChimpService,
    public alertCtrl: AlertController,
    navParams: NavParams) {

   // this.setGoogleAnalytics();

    this.listServices = {

    };

    this.componentName = navParams.get('componentName');
    this.service = this.listServices[this.componentName];

    if (this.service) {
      // this.pages = this.service.getAllThemes();
      // this.title = this.service.getTitle();
      this.eventTrackView(this.title);
    } else {
      navCtrl.setRoot("SigninPage");
      return;
    }
  }

  selectPageForOpen(value: string): any {
    let page;

    switch (value) {
      case "spinner":
        page = "ItemDetailsPageSpinner";
        break;
      case "textViews":
        page = "ItemDetailsPageTextView";
        break;
      case "splashScreens":
        page = "ItemDetailsPageSplashScreen";
        break;
      case "searchBars":
        page = "ItemDetailsPageSearchBar";
        break;
      case "checkBoxes":
        page = "ItemDetailsPageCheckBox";
        break;
      case "wizard":
        page = "ItemDetailsPageWizard";
        break;
      case "tabs":
        page = "ItemDetailsPageTabs";
        break;
      case "login":
        page = "ItemDetailsPageLogin";
        break;
      case "register":
        page = "ItemDetailsPageRegister";
        break;
      case "expandable":
        page = "ItemDetailsPageExpandable";
        break;
      case "swipeToDismiss":
        page = "ItemDetailsPageSwipeToDismiss";
        break;
      case "dragAndDrop":
        page = "ItemDetailsPageDragAndDrop";
        break;
      case "appearanceAnimation":
        page = "ItemDetailsPageAppearanceAnimation";
        break;
      case "googleCards":
        page = "ItemDetailsPageGoogleCard";
        break;
      case "stickyListHeader":
        page = "ItemDetailsPageStickyListHeader";
        break;
      case "parallax":
        page = "ItemDetailsPageParallax";
        break;
      case "maps":
        page = "ItemDetailsPageMaps";
        break;
      case "imageGallery":
        page = "ItemDetailsPageImageGallery";
        break;
      case "qrcode":
        page = "ItemDetailsPageQRCode";
        break;
      case "radioButton":
        page = "ItemDetailsPageRadioButton";
        break;
      case "range":
        page = "ItemDetailsPageRange";
        break;
      case "toggle":
        page = "ItemDetailsPageToggle";
        break;
      case "select":
        page = "ItemDetailsPageSelect";
        break;
      case "actionSheet":
        page = "ItemDetailsPageActionSheet";
        break;

      default:
        page = "ItemDetailsPage";
    }
    return page;
  }

  openPage(page: any) {
    if (AppSettings.SUBSCRIBE) {
      if (this.mailChimpService.showMailChimpForm()) {
        this.mailChimpService.setMailChimpForm(false);
        this.showPrompt();
      } else {
        this.navigation(page);
      }
    } else {
      this.navigation(page);
    }
  }

  navigation(page: any) {
    if (page.listView) {
      this.navCtrl.push(ItemsPage, {
        componentName: page.theme
      });
    } else {
      this.navCtrl.push(this.selectPageForOpen(this.componentName), {
        service: this.service,
        page: page
      });

    }
  }

  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'STAY TUNED FOR NEW <br> THEMES AND FREEBIES',
      message: "SUBSCRIBE TO <br> OUR NEWSLETTER",
      inputs: [
        {
          name: 'email',
          placeholder: 'Your e-mail'
        },
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Send',
          handler: data => {
            if (data) {
              if (this.validationService.isMail(data.email)) {
                this.httpService.sendData(data.email).subscribe(
                  data => {
                    this.mailChimpService.hideMailChimp();
                  }, err => {
                    alert(err);
                  }, null);
              } else {
                return false;
              }
            } else {
              return false
            }
          }
        }
      ]
    });
    prompt.present();
  };

  setGoogleAnalytics() {
      if (window.location.hostname != "localhost") {
          // this.ga.startTrackerWithId("UA-35500609-14").then(() => {
          //     this.ga.trackEvent("active", "user", "click");
          // })
      } else {
          console.log("Start Tracker");
      }
  }

  eventTrackView(event) {
      if (window.location.hostname != "localhost") {
          // this.ga.trackView(event, "Items", false);
          // this.ga.trackEvent("openPage", event, "click");
      } else {
          console.log("event:" + event);
      }
  }
}
