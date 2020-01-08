
import { Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend } from '@angular/http';
import { Injectable, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Platform, MenuController, Nav, ModalController, NavController, App, AlertController, Events } from 'ionic-angular';
// operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ToastService } from './toast-service';


@Injectable()
export class HttpInterceptor extends Http {
    @ViewChild(Nav) nav: Nav;
    public forbidden = false;
    public flag = false;
    constructor(
        backend: XHRBackend,
        options: RequestOptions,
        public http: Http, public alertCtrl: AlertController,
        public app: App, public errorEvent: Events, private toaster: ToastService
    ) {
        super(backend, options);
        this.forbidden = false;
    }

    public request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        // this.forbidden = false;
        return super.request(url, options)
            .catch(this.handleError);
    }

    public handleError = (error) => {
        if (error.status === 404) {
            this.toaster.presentToast('URL is not correct');
        }
        else if (error.statusText === '') {
            this.toaster.presentToast('Server is down');
        }
        // Do messaging and error handling here
        let errorresponse = JSON.parse(error._body);
        this.toaster.presentToast(errorresponse.message);
        if (localStorage.getItem('token') !== null) {
            if ((errorresponse.status === 'Forbidden Request' || errorresponse.code === 1001) && this.forbidden === false) {
                this.presentAlert('FORBIDDEN');
                this.forbidden = true;
                return Observable.throw(error);
            }
        } else if (error.statusText === '') {
            //    this.toaster.presentToast('Server is down');
        }
    }
    presentAlert(FORBIDDEN) {
        let alert = this.alertCtrl.create({
            title: 'Token Expire',
            subTitle: 'Token is expired you need to login again',
            buttons: [{
                text: 'Agree',
                handler: () => {
                    this.errorEvent.publish('Forbidden Error', FORBIDDEN);
                    this.forbidden = true;
                }
            }]
        });
        alert.present();
        // this.app.getRootNav().setRoot(SigninPage);
    }

}
