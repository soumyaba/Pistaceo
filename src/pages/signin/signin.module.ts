import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SigninPage } from './signin';
import { FormsModule, ReactiveFormsModule } from '../../../node_modules/@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SigninPage,
  ],
  imports: [
    IonicPageModule.forChild(SigninPage), TranslateModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SigninPageModule {}
