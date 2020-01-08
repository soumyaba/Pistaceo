import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddUrlPage } from './add-url';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AddUrlPage,
  ],
  imports: [
    IonicPageModule.forChild(AddUrlPage), TranslateModule
  ],
})
export class AddUrlPageModule {}
