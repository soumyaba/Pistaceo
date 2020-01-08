import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SimpleFormPage } from './simple-form';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SimpleFormPage,
  ],
  imports: [
    IonicPageModule.forChild(SimpleFormPage), TranslateModule
  ],
})
export class SimpleFormPageModule { }
