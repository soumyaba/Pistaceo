import { IService } from './IService';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from './app-settings'
import { ToastService } from './toast-service'
import { LoadingService } from './loading-service'

@Injectable()
export class LoginService implements IService {

    constructor(private loadingService: LoadingService, private toastCtrl: ToastService) { }

    getId = (): string => 'login';

    getTitle = (): string => 'Login pages';

    getAllThemes = (): Array<any> => {
        return [
          {"title" : "Login + logo 1", "theme"  : "layout1"},
          {"title" : "Login + logo 2", "theme"  : "layout2"}
        ];
    };

    getDataForTheme = (menuItem: any): Array<any> => {
        return this[
            'getDataFor' +
            menuItem.theme.charAt(0).toUpperCase() +
            menuItem.theme.slice(1)
        ]();
    };

    // LOGIN - Login + logo 1 data
    getDataForLayout1 = (): any => {
      return {
        "username"        : "Enter your username",
        "password"        : "Enter your password",
        "labelUsername"   : "USERNAME",
        "labelPassword"   : "PASSWORD",
        "register"        : "Register now!",
        "forgotPassword"  : "Forgot password?",
        "login"           : "Login",
        "subtitle"        : "Welcome",
        "title"           : "Login to your account",
        "skip"            : "Skip",
        "logo"            : "assets/images/logo/2.png",
        "errorUser"       : "Field can't be empty.",
        "errorPassword"   : "Field can't be empty."
      };
    };

    // LOGIN - Login + logo 2 data
    getDataForLayout2 = (): any => {
      return {
        "forgotPassword" : "Forgot password?",
        "subtitle"       : "Welcome",
        "labelUsername"  : "USERNAME",
        "labelPassword"  : "PASSWORD",
        "title"          : "Login to your account",
        "username"       : "Enter your username",
        "password"       : "Enter your password",
        "register"       : "Register",
        "login"          : "Login",
        "skip"           : "Skip",
        "logo"           : "assets/images/logo/2.png",
        "errorUser"      : "Field can't be empty.",
        "errorPassword"  : "Field can't be empty."
      };
    };


    getEventsForTheme = (menuItem: any): any => {
      var that = this
        return {
            onLogin: function(params) {
                that.toastCtrl.presentToast('onLogin');
            },
            onForgot: function() {
                that.toastCtrl.presentToast('onForgot');
            },
            onRegister: function(params) {
                  that.toastCtrl.presentToast('onRegister');
            },
            onSkip: function(params) {
                  that.toastCtrl.presentToast('onSkip');
            },
            onFacebook: function(params) {
                that.toastCtrl.presentToast('onFacebook');
            },
            onTwitter: function(params) {
                  that.toastCtrl.presentToast('onTwitter');
            },
            onGoogle: function(params) {
                that.toastCtrl.presentToast('onGoogle');
            },
            onPinterest: function(params) {
                that.toastCtrl.presentToast('onPinterest');
            },
        };
    };


    prepareParams = (item: any) => {
        let result = {
            title: item.title,
            data: [],
            events: this.getEventsForTheme(item)
        };
        result[this.getShowItemId(item)] = true;
        return result;
    };

    getShowItemId = (item: any): string => {
        return this.getId() + item.theme.charAt(0).toUpperCase() + "" + item.theme.slice(1);
    }

    load(item: any): Observable<any> {
        var that = this;
        that.loadingService.show();
        if (AppSettings.IS_FIREBASE_ENABLED) {
            return new Observable(observer => {
                // this.af
                //     .object('login/' + item.theme)
                //     .valueChanges()
                //     .subscribe(snapshot => {
                //         that.loadingService.hide();
                //         observer.next(snapshot);
                //         observer.complete();
                //     }, err => {
                //         that.loadingService.hide();
                //         observer.error([]);
                //         observer.complete();
                //     });
            });
        } else {
            return new Observable(observer => {
                that.loadingService.hide();
                observer.next(this.getDataForTheme(item));
                observer.complete();
            });
        }
    }
}
