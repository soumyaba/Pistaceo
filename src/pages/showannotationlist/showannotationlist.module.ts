import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowannotationlistPage } from './showannotationlist';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ShowannotationlistPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowannotationlistPage), TranslateModule
  ],
})
export class ShowannotationlistPageModule {}
