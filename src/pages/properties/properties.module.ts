import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PropertiesPage } from './properties';
import { ZoomAreaModule } from 'ionic2-zoom-area';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    PropertiesPage,
  ],
  imports: [
    IonicPageModule.forChild(PropertiesPage), TranslateModule
  ]
})
export class PropertiesPageModule {}
