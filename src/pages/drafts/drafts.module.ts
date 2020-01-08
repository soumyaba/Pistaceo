import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DraftsPage } from './drafts';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DraftsPage,
  ],
  imports: [
    IonicPageModule.forChild(DraftsPage), TranslateModule
  ],
})
export class DraftsPageModule {}
