import { LoadingController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class LoadingService {
  loading:any;
  constructor(private loadingCtrl: LoadingController, private translate: TranslateService) {}

  show() {
    this.loading = this.loadingCtrl.create({
        content: this.translate.instant('Please wait...')
    });
    this.loading.present();
  }

  hide() {
    this.loading.dismiss();
  }
}
