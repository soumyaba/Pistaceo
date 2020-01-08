import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PropertyPage } from './property';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    PropertyPage,
  ],
  imports: [
    IonicPageModule.forChild(PropertyPage), TranslateModule
  ],
})
export class PropertyPageModule {}
