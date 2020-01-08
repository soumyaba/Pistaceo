import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckinFilePage } from './checkin-file';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CheckinFilePage,
  ],
  imports: [
    IonicPageModule.forChild(CheckinFilePage), TranslateModule
  ],
})
export class CheckinFilePageModule {}
