import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SentPage } from './sent';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SentPage,
  ],
  imports: [
    IonicPageModule.forChild(SentPage), TranslateModule
  ],
})
export class SentPageModule {}
